import React, { useState } from 'react';
import { Search, Plus, Leaf } from 'lucide-react';
import type { Plant } from '../types';
import { COMMON_PLANTS } from '../dummy_data';
import { motion, AnimatePresence } from 'motion/react';

interface PlantSelectorProps {
    selectedPlant: Plant | null;
    onSelect: (plant: Plant) => void;
}

export const PlantSelector: React.FC<PlantSelectorProps> = ({ selectedPlant, onSelect }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [customName, setCustomName] = useState('');

    const handleAddCustom = () => {
        if (!customName.trim()) return;
        const newPlant: Plant = {
            id: Date.now().toString(),
            name: customName,
            type: 'Custom',
            idealPpm: { min: 800, max: 1200 },
            idealTemp: { min: 20, max: 25 },
            idealHumi: { min: 26, max: 40 },
        };
        onSelect(newPlant);
        setCustomName('');
        setIsAdding(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-500" />
                    Select Plant
                </h2>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" />
                    Add Custom
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="flex gap-2 p-1">
                        <input
                            type="text"
                            placeholder="Enter plant name..."
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                        <button
                            onClick={handleAddCustom}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COMMON_PLANTS.map((plant) => (
                    <button
                        key={plant.id}
                        onClick={() => onSelect(plant)}
                        className={`p-4 rounded-2xl border transition-all text-left ${
                        selectedPlant?.id === plant.id
                            ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                        }`}
                    >
                        <p className={`font-bold ${selectedPlant?.id === plant.id ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {plant.name}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                            {plant.type}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
