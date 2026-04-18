import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './db.js';
import client, { publishCommand } from './mqtt.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. Get latest sensor data
app.get('/api/sensors/latest', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No sensor data found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching latest data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Get sensor history
app.get('/api/sensors/history', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 100;
        const result = await pool.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT $1', [limit]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 3. Toggle actuator
app.post('/api/actuators/toggle', (req, res) => {
    const { device, action } = req.body; // e.g., { device: 'light', action: 'ON' }
    
    if (!device || !action) {
        return res.status(400).json({ error: 'Device and action are required' });
    }

    if (!['light', 'pump'].includes(device)) {
        return res.status(400).json({ error: 'Invalid device. Must be "light" or "pump"' });
    }

    publishCommand(device, action);
    res.json({ status: 'Command sent', device, action });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('MQTT Client initialized.');
});
