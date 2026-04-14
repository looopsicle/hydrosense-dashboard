import { useEffect, useState } from 'react';
import type { SensorData } from '../types';

export function useSensorData() {
    const [sensorData, setSensorData] = useState<SensorData>({
        ppm: 800,
        temperature: 22.5,
        timestamp: new Date().toLocaleTimeString(),
        humidity: 50
    });

    const [history, setHistory] = useState<SensorData[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSensorData(prev => {
                const newData = {
                    ppm: Math.round(prev.ppm + (Math.random() - 0.5) * 10),
                    temperature: Number((prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)),
                    humidity: Number((prev.humidity + (Math.random() - 0.5) * 0.2).toFixed(1)),
                    timestamp: new Date().toLocaleTimeString()
                };

                setHistory(h => [...h.slice(-19), newData]);
                
                return newData;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return { sensorData, history };
}