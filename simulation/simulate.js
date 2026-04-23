import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883'; 
const topic = 'hydrosense/sensors';

const mqttOptions = {
    username: 'hydrosense_admin',
    password: 'password123',
};

const client = mqtt.connect(brokerUrl, mqttOptions);

client.on('connect', () => {
    console.log('Connected to MQTT broker for simulation');

    setInterval(() => {
        const sensorData = {
            tds: Math.floor(Math.random() * (1200 - 400) + 400),
            water_temp: parseFloat((Math.random() * (28 - 20) + 20).toFixed(1)),
            room_temp: parseFloat((Math.random() * (32 - 24) + 24).toFixed(1)),
            lux: Math.floor(Math.random() * (50000 - 10000) + 10000),
        };

        client.publish(topic, JSON.stringify(sensorData), { qos: 1 }, (err) => {
            if (err) {
                console.error('Failed to publish sensor data:', err);
            } else {
                console.log('Simulated data sent:', sensorData);
            }
        });
    }, 5000); // Send data every 5 seconds
});

client.on('error', (err) => {
    console.error('MQTT Connection Error:', err);
});
