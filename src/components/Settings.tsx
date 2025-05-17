import React, {useEffect, useState} from "react";

const Settings: React.FC = () => {
    const [alarmOn, setAlarmOn] = useState<boolean>(false);
    const [notifySeconds, setNotifySeconds] = useState<number>(5);

    // Load from localStorage on mount
    useEffect(() => {
        const savedAlarm = localStorage.getItem("alarmOn");
        const savedNotify = localStorage.getItem("notifySeconds");

        if (savedAlarm !== null) setAlarmOn(savedAlarm === "true");
        if (savedNotify !== null) setNotifySeconds(Number(savedNotify));
    }, []);

    // Save to localStorage when settings change
    useEffect(() => {
        localStorage.setItem("alarmOn", alarmOn.toString());
        localStorage.setItem("notifySeconds", notifySeconds.toString());
    }, [alarmOn, notifySeconds]);

    const toggleAlarm = () => {
        setAlarmOn((prev) => !prev);
    };

    return (
        <div className="p-4 border rounded shadow max-w-sm mx-auto space-y-4">
            <h2 className="text-lg font-bold">Settings</h2>

            <div className="flex items-center justify-between">
                <span>Alarm:</span>
                <button
                    onClick={toggleAlarm}
                    className={`px-4 py-2 rounded text-white ${
                        alarmOn ? "bg-red-600" : "bg-gray-400"
                    }`}
                >
                    {alarmOn ? "Turn Off" : "Turn On"}
                </button>
            </div>

            <div className="flex items-center justify-between">
                <label htmlFor="notify-seconds">Notify (seconds):</label>
                <input
                    id="notify-seconds"
                    type="number"
                    min={1}
                    className="w-20 p-1 border rounded"
                    value={notifySeconds}
                    onChange={(e) => setNotifySeconds(Number(e.target.value))}
                />
            </div>
        </div>
    );
};

export default Settings;
