import React, { useRef, useEffect, useState } from "react";

type VideoStreamingProps = {
    onFallConfirmed: () => void;
    onFallEnded: () => void;
};

const VideoStreaming: React.FC<VideoStreamingProps> = ({ onFallConfirmed, onFallEnded }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const [status, setStatus] = useState("Idle");
    const [streaming, setStreaming] = useState(false);
    const [processedFrame, setProcessedFrame] = useState<string | null>(null);

    // fall detection
    const fallTimerRef = useRef<NodeJS.Timeout | null>(null);
    const fallConfirmedRef = useRef(false);
    const [fallConfirmTimeMs, setFallConfirmTimeMs] = useState(1000);

    useEffect(() => {
        const storedSeconds = localStorage.getItem("notifySeconds");
        if (storedSeconds) {
            const seconds = parseInt(storedSeconds, 10);
            if (!isNaN(seconds) && seconds > 0) {
                setFallConfirmTimeMs(seconds * 1000);
            }
        }
    }, []);

    // Call this method per frame with your detection result:
    function handleFallDetected(isFalling: boolean) {
        if (isFalling) {
            if (!fallTimerRef.current && !fallConfirmedRef.current) {
                // Start timer when fall first detected
                fallTimerRef.current = setTimeout(() => {
                    fallConfirmedRef.current = true;
                    onFallConfirmed(); // Notify parent after 3 seconds fall
                    fallTimerRef.current = null;
                }, fallConfirmTimeMs);
            }
            // If already confirmed, do nothing
        } else {
            // Fall not detected on this frame, reset timer & state if not confirmed
            if (fallTimerRef.current) {
                clearTimeout(fallTimerRef.current);
                fallTimerRef.current = null;
            }
            if (fallConfirmedRef.current) {
                fallConfirmedRef.current = false;
                onFallEnded(); // Notify parent fall ended
            }
        }
    }

    const startStreaming = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }

            socketRef.current = new WebSocket("ws://localhost:8000/ws");

            socketRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                handleFallDetected(data.fall);
                setStatus(data.fall ? "Fall Detected!" : "No Fall");

                if (data.frame) {
                    setProcessedFrame(`data:image/jpeg;base64,${data.frame}`);
                }
            };

            const sendFrame = () => {
                if (
                    !videoRef.current ||
                    !canvasRef.current ||
                    !socketRef.current ||
                    socketRef.current.readyState !== WebSocket.OPEN
                ) return;

                const video = videoRef.current!;
                canvasRef.current.width = video.videoWidth;
                canvasRef.current.height = video.videoHeight;
                const ctx = canvasRef.current.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                canvasRef.current.toBlob((blob) => {
                    if (blob) socketRef.current?.send(blob);
                }, "image/jpeg", 0.7);
            };

            intervalRef.current = setInterval(sendFrame, 150);
            setStreaming(true);
        } catch (error) {
            console.error("Failed to access camera:", error);
            setStatus("Camera not accessible");
        }
    };

    const stopStreaming = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current as any);
            intervalRef.current = null;
        }

        socketRef.current?.close();
        socketRef.current = null;
        setStreaming(false);
        setStatus("Idle");
        setProcessedFrame(null);
    };

    return (
        <div className="p-4 border rounded shadow mx-auto">
            {/*<h2 className="text-lg font-bold mb-2">Real-Time Video Stream</h2>*/}

            <div className="space-x-2 mb-2">
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    onClick={startStreaming}
                    disabled={streaming}
                >
                    Start Camera
                </button>

                <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={stopStreaming}
                    disabled={!streaming}
                >
                    Stop Camera
                </button>
            </div>

            <div>
                <video ref={videoRef} style={{ width: '100%', display: "none" }} />
                <canvas ref={canvasRef} style={{ width: '100%', display: "none" }} />

                {/*<div className="mt-2 text-sm">*/}
                {/*    <strong>Status:</strong> {status}*/}
                {/*</div>*/}

                {processedFrame && (
                    <div className="mt-4">
                        <img src={processedFrame} style={{ width: '100%'}} alt="Processed Frame" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoStreaming;
