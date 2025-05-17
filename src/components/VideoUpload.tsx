import React, { useState } from "react";

const VideoUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/upload-video", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setProcessedUrl(`http://localhost:8000/${data.output_video}`);
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded shadow w-full max-w-md mx-auto">
            {/*<h2 className="text-lg font-bold mb-2">Upload a Video for Processing</h2>*/}
            <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpload}
                disabled={!file || loading}
            >
                {loading ? "Uploading..." : "Upload & Process"}
            </button>

            {processedUrl && (
                <div className="mt-4">
                    <h3 className="font-semibold">Processed Result:</h3>
                    <video controls width="100%">
                        <source src={processedUrl} type="video/mp4" />
                    </video>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
