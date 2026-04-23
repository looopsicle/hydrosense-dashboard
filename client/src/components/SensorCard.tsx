import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface SensorCardProps {
    title: string;
    value: string | number;
    unit: string;
    icon: LucideIcon;
    color: string;
    status: 'normal' | 'warning' | 'critical';
}

export const SensorCard = ({
    title,
    value,
    unit,
    icon: Icon,
    color,
    status,
}: SensorCardProps) => {
    const statusColors = {
        normal: 'text-emerald-500',
        warning: 'text-amber-500',
        critical: 'text-rose-500',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl shadow-black/5"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-2xl bg-opacity-10", color)}>
                    <Icon className={cn("w-6 h-6 text-white")} />
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                    <span className={cn("text-xs font-semibold uppercase tracking-wider", statusColors[status])}>
                        {status}
                    </span>
                </div>
            </div>

            <div>
                <p className="text-slate-500 text-sm font-medium mb-2">
                    {title}
                </p>

                <div className="flex items-baseline gap-1">
                    <h3 className="text-4xl font-bold text-slate-800">
                        {value}
                    </h3>
                    <span className="text-slate-400 font-medium">
                        {unit}
                    </span>
                </div>

            </div>
        </motion.div>
    );
};
