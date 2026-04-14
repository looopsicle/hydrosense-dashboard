import React from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface ControlToggleProps {
    label: string;
    isActive: boolean;
    onToggle: () => void;
    icon: LucideIcon;
    activeColor: string;
}

export const ControlToggle: React.FC<ControlToggleProps> = ({
    label,
    isActive,
    onToggle,
    icon: Icon,
    activeColor,
}) => {
    return (
        <button
            onClick={onToggle}
            className={cn(
                "relative flex items-center justify-between w-full p-3 rounded-2xl transition-all duration-300 border",
                isActive 
                ? cn("bg-white border-transparent shadow-lg", activeColor.replace('bg-', 'ring-1 ring-'))
                : "bg-slate-50/50 border-slate-100 text-slate-400"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "p-2 rounded-xl transition-colors",
                    isActive ? activeColor : "bg-slate-200"
                )}>
                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-600")} />
                </div>
                
                <span className={cn("font-semibold", isActive ? "text-slate-800" : "text-slate-700")}>
                    {label}
                </span>
            </div>
            
            <div className={cn(
                "w-12 h-6 rounded-full p-1 transition-colors duration-300",
                isActive ? activeColor : "bg-slate-300"
            )}>
                <motion.div
                    animate={{ x: isActive ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
            </div>
        </button>
    );
};
