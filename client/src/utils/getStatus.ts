export function getStatus(value: number, min: number, max: number) {
    if (value < min || value > max) 
        return 'critical';
    
    if (value < min + (max - min) * 0.1 || value > max - (max - min) * 0.1)
        return 'warning';
    
    return 'normal';
}