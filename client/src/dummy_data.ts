import type { Plant } from "./types";

export const COMMON_PLANTS: Plant[] = [
    {
        id: '1',
        name: 'Lettuce',
        type: 'Leafy Green',
        idealPpm: { min: 560, max: 840 },
        idealTemp: { min: 18, max: 24 },
        idealHumi: { min: 26, max: 40 },
    },
    {
        id: '2',
        name: 'Tomato',
        type: 'Fruit',
        idealPpm: { min: 1400, max: 3500 },
        idealTemp: { min: 20, max: 28 },
        idealHumi: { min: 26, max: 40 },
    },
    {
        id: '3',
        name: 'Basil',
        type: 'Herb',
        idealPpm: { min: 700, max: 1120 },
        idealTemp: { min: 21, max: 27 },
        idealHumi: { min: 26, max: 40 },
    },
    {
        id: '4',
        name: 'Strawberry',
        type: 'Fruit',
        idealPpm: { min: 1260, max: 1540 },
        idealTemp: { min: 15, max: 25 },
        idealHumi: { min: 26, max: 40 },
    },
];
