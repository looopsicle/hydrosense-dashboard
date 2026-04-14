export interface Plant {
    id: string;
    name: string;
    type: string;
    idealPpm: { min: number; max: number };
    idealTemp: { min: number; max: number };
    idealHumi: { min: number; max: number };
}

export interface SensorData {
    ppm: number;
    temperature: number;
    timestamp: string;
    humidity: number;
}

export interface DeviceStatus {
    waterPump: boolean;
    uvLight: boolean;
}
