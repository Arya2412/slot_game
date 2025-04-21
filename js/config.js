/**
 * Game Configuration
 * Contains all game settings and constants
 */
const CONFIG = {
    // Game Settings
    initialBalance: 10000,
    defaultBet: 10,
    minBet: 5,
    maxBet: 2000,
    
    // Symbols Configuration
    symbols: [
        { id: 'skull', name: 'Skull', value: 5 },
        { id: 'ghost', name: 'Ghost', value: 4 },
        { id: 'pumpkin', name: 'Pumpkin', value: 3 },
        { id: 'cauldron', name: 'Cauldron', value: 2 },
        { id: 'potion', name: 'Potion', value: 1 },
        { id: 'bat', name: 'Bat', value: 0.5 }
    ],
    
    // Win Multipliers
    winMultipliers: {
        two: 1.5,   // 2 matching symbols
        three: 2    // 3 matching symbols
    },
    
    // Free Spins Threshold
    freeSpinsThreshold: 5000,
    freeSpinsAmount: 5,
    
    // Animation Durations (ms)
    animationDurations: {
        splash: 3000,
        spin: 2000,
        quickSpin: 500,
        win: 3000,
        notification: 3000
    },
    
    // Auto Spin Options
    autoSpinOptions: [15, 50, 100],
    
    // Paylines Configuration
    paylines: [
        // Horizontal lines
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonal lines
        [0, 4, 8], [2, 4, 6]
    ],
    
    // Sound Settings
    sounds: {
        enabled: true,
        volume: 0.5
    }
};