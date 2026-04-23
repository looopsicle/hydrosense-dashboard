import { useEffect, useState } from 'react';
import type { SensorData } from '../types';
import { socket } from '../lib/socket';

export function useSensorData() {
    const [sensorData, setSensorData] = useState<SensorData>({
        ppm: 0,
        temperature: 0,
        timestamp: '--:--:--',
        humidity: 0,
        lux: 0
    });

    const [history, setHistory] = useState<SensorData[]>([]);

    useEffect(() => {
        // 1. Fetch initial history
        const fetchHistory = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const response = await fetch(`${baseUrl}/api/sensors/history?limit=20`);
                const data = await response.json();
                
                // Map DB fields to Frontend fields
                const formattedData = data.map((item: any) => ({
                    ppm: item.tds,
                    temperature: item.water_temp,
                    humidity: item.room_temp,
                    lux: item.lux,
                    timestamp: new Date(item.timestamp).toLocaleTimeString()
                })).reverse();

                setHistory(formattedData);
                if (formattedData.length > 0) {
                    setSensorData(formattedData[formattedData.length - 1]);
                }
            } catch (err) {
                console.error('Error fetching history:', err);
            }
        };

        fetchHistory();

        // 2. Listen for real-time updates
        socket.on('sensorUpdate', (data: any) => {
            const newData: SensorData = {
                ppm: data.tds,
                temperature: data.water_temp,
                humidity: data.room_temp,
                lux: data.lux,
                timestamp: new Date(data.timestamp).toLocaleTimeString()
            };

            setSensorData(newData);
            setHistory(prev => {
                const updatedHistory = [...prev, newData];
                return updatedHistory.slice(-20);
            });
        });

        return () => {
            socket.off('sensorUpdate');
        };
    }, []);

    return { sensorData, history };
}