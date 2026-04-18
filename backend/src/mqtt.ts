import mqtt from 'mqtt';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const brokerUrl = process.env.MQTT_URL || 'mqtt://mosquitto:1883';
const topicSensors = 'hydrosense/sensors';

// Persistent session configuration
const mqttOptions: mqtt.IClientOptions = {
    clientId: 'hydrosense_backend_service',
    clean: false, 
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    username: process.env.MQTT_USERNAME ?? '',
    password: process.env.MQTT_PASSWORD ?? '',
};

const client: mqtt.MqttClient = mqtt.connect(brokerUrl, mqttOptions);

client.on('connect', (connack) => {
    console.log(`Connected to MQTT broker. Session present: ${connack.sessionPresent}`);
    
    // Subscribe with QoS 1 to ensure delivery
    client.subscribe(topicSensors, { qos: 1 }, (err: any) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${topicSensors}`);
        }
    });
});

client.on('message', async (topic: string, message: Buffer) => {
    if (topic === topicSensors) {
        try {
            const data = JSON.parse(message.toString());
            const { tds, water_temp, room_temp, lux } = data;

            // Basic validation
            if (tds === undefined || water_temp === undefined || room_temp === undefined || lux === undefined) {
                console.warn('Received incomplete sensor data:', data);
                return;
            }

            // Insert into database
            const query = `
                INSERT INTO sensor_data (tds, water_temp, room_temp, lux)
                VALUES ($1, $2, $3, $4)
            `;
            await pool.query(query, [tds, water_temp, room_temp, lux]);
            
            console.log('Sensor data saved to database');
        } catch (err) {
            console.error('Error processing MQTT message:', err);
        }
    }
});

client.on('error', (err: any) => {
    console.error('MQTT Client Error:', err);
});

export const publishCommand = (device: string, action: string) => {
    const topic = `hydrosense/actuators/${device}`;
    const payload = JSON.stringify({ action, timestamp: new Date().toISOString() });
    
    client.publish(topic, payload, { qos: 1 }, (err: any) => {
        if (err) {
            console.error(`Failed to publish command to ${topic}:`, err);
        } else {
            console.log(`Command published to ${topic}: ${action}`);
        }
    });
};

export default client;
