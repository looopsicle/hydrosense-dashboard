import { useState } from 'react';
import type { DeviceStatus } from '../types';
import { updateDevice } from '../services/deviceService';

export function useDeviceControl() {
    const [status, setStatus] = useState<DeviceStatus>({
        waterPump: false,
        uvLight: false,
    });

    const toggleDevice = async (key: keyof DeviceStatus) => {
        const newValue = !status[key];
        const deviceName = key === 'waterPump' ? 'pump' : 'light';
        const action = newValue ? 'ON' : 'OFF';

        try {
            // Optimistic update
            setStatus(prev => ({
                ...prev,
                [key]: newValue
            }));

            await updateDevice(deviceName, action);
        } catch (err) {
            console.error(`Failed to toggle ${key}:`, err);
            // Revert on error
            setStatus(prev => ({
                ...prev,
                [key]: !newValue
            }));
        }
    };

    return { status, toggleDevice };
}