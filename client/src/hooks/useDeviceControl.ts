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
        
        setStatus(prev => ({
            ...prev,
            [key]: newValue
        }));

        // call api await updateDevice(key, newValue) / mqtt publsh 
    };

    return { status, toggleDevice };
}