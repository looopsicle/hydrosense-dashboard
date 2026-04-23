export async function updateDevice(device: string, action: 'ON' | 'OFF') {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    const response = await fetch(`${baseUrl}/api/actuators/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device, action })
    });

    if (!response.ok) {
        throw new Error('Failed to update device');
    }

    return await response.json();
}