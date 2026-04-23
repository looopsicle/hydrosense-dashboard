import { useState, useMemo } from 'react';
import { Droplets, Thermometer, Power, Zap, Activity, Settings, Bell, Leaf, Waves, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import type { Plant } from '../types';

import { SensorCard } from '../components/SensorCard';
import { ControlToggle } from '../components/ControlToggle';
import { PlantSelector } from '../components/PlantSelector';

import { useSensorData } from '../hooks/useSensorData';
import { useDeviceControl } from '../hooks/useDeviceControl';
import { useAuthStore } from '../store/useAuthStore';
import { getStatus } from '../utils/getStatus';

export default function Dashboard() {
    const { user } = useAuthStore();

    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    const { sensorData, history } = useSensorData();

    const { status, toggleDevice } = useDeviceControl();

    const ppmStatus = useMemo(() => {
        if (!selectedPlant) 
            return 'normal';

        return getStatus(
            sensorData.ppm, 
            selectedPlant.idealPpm.min, 
            selectedPlant.idealPpm.max
        );
    }, [sensorData.ppm, selectedPlant]);

    const tempStatus = useMemo(() => {
        if (!selectedPlant) 
            return 'normal';

        return getStatus(
            sensorData.temperature, 
            selectedPlant.idealTemp.min, 
            selectedPlant.idealTemp.max
        );
    }, [sensorData.temperature, selectedPlant]);

    const humiStatus = useMemo(() => {
        if (!selectedPlant) 
            return 'normal';

        return getStatus(
            sensorData.humidity, 
            selectedPlant.idealHumi.min, 
            selectedPlant.idealHumi.max
        );
    }, [sensorData.humidity, selectedPlant]);

    const luxStatus = useMemo(() => {
        if (!selectedPlant) 
            return 'normal';

        return getStatus(
            sensorData.lux,
            selectedPlant.idealLux.min,
            selectedPlant.idealLux.max
        );
    }, [sensorData.lux, selectedPlant]);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8 font-sans">
            <div className="w-fill px-4 md:px-8 space-y-8">

                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">
                            Hydro<span className="text-emerald-500">Sense</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Hydroponic Monitoring Dashboard</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
                            <Bell className="w-5 h-5 text-slate-400" />
                        </button>
                        <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
                            <Settings className="w-5 h-5 text-slate-400" />
                        </button>
                        <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block" />
                        <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">
                                {user?.username?.charAt(0) || 'G'}
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                                {user?.username || 'Guest'}
                            </span>
                        </div>
                    </div>
                </header>

                <section className="bg-white/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/20 shadow-sm">
                    <PlantSelector selectedPlant={selectedPlant} onSelect={setSelectedPlant} />
                </section>

                {selectedPlant ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8"
                >
                    <div className="lg:col-span-2 space-y-6">    
                        <div className="grid grid-cols-2 gap-6 auto-rows-fr">
                            <SensorCard
                                title="PPM Level"
                                value={sensorData.ppm}
                                unit="ppm"
                                icon={Waves}
                                color="bg-blue-500"
                                status={ppmStatus}
                            />
                            <SensorCard
                                title="Water Temp"
                                value={sensorData.temperature}
                                unit="°C"
                                icon={Thermometer}
                                color="bg-rose-500"
                                status={tempStatus}
                            />
                            <SensorCard
                                title="Humidity Storage"
                                value={sensorData.humidity}
                                unit="%"
                                icon={Droplets}
                                color="bg-green-500"
                                status={humiStatus}
                            />
                            <SensorCard
                                title="Light Intensity"
                                value={sensorData.lux}
                                unit="lx"
                                icon={Sun}
                                color="bg-yellow-500"
                                status={luxStatus}
                            />
                        </div>

                        <div className="bg-slate-900 p-5 rounded-[2rem] shadow-2xl space-y-6">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <Power className="w-5 h-5 text-emerald-400" />
                                Device Controls
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <ControlToggle
                                    label="Water Pump"
                                    isActive={status.waterPump}
                                    onToggle={() => toggleDevice('waterPump')}
                                    icon={Activity}
                                    activeColor="bg-cyan-500"
                                />
                                <ControlToggle
                                    label="UV Light"
                                    isActive={status.uvLight}
                                    onToggle={() => toggleDevice('uvLight')}
                                    icon={Zap}
                                    activeColor="bg-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* chart */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/5 h-full min-h-[400px] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Growth Environment</h3>
                                    <p className="text-slate-400 text-sm font-medium">Real-time sensor history</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={history}>
                                    <defs>
                                        <linearGradient id="colorPpm" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="timestamp" 
                                        hide 
                                    />
                                    <YAxis 
                                        hide 
                                        domain={['dataMin - 50', 'dataMax + 50']}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                        borderRadius: '16px', 
                                        border: 'none', 
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                        }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="ppm" 
                                        stroke="#3b82f6" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorPpm)" 
                                        animationDuration={1000}
                                    />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                                <div className="space-y-1">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ideal PPM Range</p>
                                    <p className="text-slate-700 font-bold">{selectedPlant.idealPpm.min} - {selectedPlant.idealPpm.max} ppm</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ideal Temp Range</p>
                                    <p className="text-slate-700 font-bold">{selectedPlant.idealTemp.min} - {selectedPlant.idealTemp.max} °C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-10 h-10 text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">No Plant Selected</h2>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            Please select a plant from the list above or add a custom one to start monitoring.
                        </p>
                    </div>
                </motion.div>
                )}
            </div>
        </div>
    );
}
