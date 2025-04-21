/**
 * Symbol Manager
 * Handles symbol creation, rendering, and animation
 */
class SymbolManager {
    constructor() {
        this.symbols = CONFIG.symbols;
        this.symbolElements = [];
        this.symbolsContainer = document.querySelectorAll('.symbol-container');
    }
    
    /**
     * Initialize symbols on the grid
     */
    initializeSymbols() {
        this.symbolsContainer.forEach((container, index) => {
            // Clear any existing symbols
            container.innerHTML = '';
            
            // Create a new symbol element
            const symbolElement = document.createElement('div');
            symbolElement.classList.add('symbol');
            
            // Get a random symbol
            const randomSymbol = this.getRandomSymbol();
            
            // Set the symbol background image
            symbolElement.style.backgroundImage = `url('assets/symbols/${randomSymbol.id}.png')`;
            symbolElement.dataset.symbolId = randomSymbol.id;
            
            // Add the symbol to the container
            container.appendChild(symbolElement);
            
            // Store the symbol element for later reference
            this.symbolElements[index] = symbolElement;
        });
    }
    
    /**
     * Get a random symbol
     * @returns {Object} - Random symbol
     */
    getRandomSymbol() {
        const randomIndex = Math.floor(Math.random() * this.symbols.length);
        return this.symbols[randomIndex];
    }
    
    /**
     * Generate a random grid of symbols
     * @returns {Array} - Grid of symbols
     */
    generateRandomGrid() {
        const grid = [];
        
        for (let i = 0; i < 9; i++) {
            grid.push(this.getRandomSymbol());
        }
        
        return grid;
    }
    
    /**
     * Spin the reels
     * @param {boolean} isQuickSpin - Whether to use quick spin
     * @returns {Promise} - Promise that resolves when spin is complete
     */
    spinReels(isQuickSpin = false) {
        return new Promise((resolve) => {
            const spinDuration = isQuickSpin ? 
                CONFIG.animationDurations.quickSpin : 
                CONFIG.animationDurations.spin;
            
            // Generate the final grid
            const finalGrid = this.generateRandomGrid();
            
            // Start spinning animation for each reel with a delay
            const reels = document.querySelectorAll('.reel');
            
            reels.forEach((reel, reelIndex) => {
                const symbols = reel.querySelectorAll('.symbol');
                
                // Add spinning class to symbols
                symbols.forEach(symbol => {
                    symbol.classList.add(isQuickSpin ? 'quick-spinning' : 'spinning');
                });
                
                // Set a timeout to stop the spinning with a staggered effect
                setTimeout(() => {
                    // Stop spinning animation
                    symbols.forEach((symbol, symbolIndex) => {
                        symbol.classList.remove('spinning', 'quick-spinning');
                        
                        // Calculate the grid index
                        const gridIndex = reelIndex + (symbolIndex * 3);
                        
                        // Update the symbol
                        const newSymbol = finalGrid[gridIndex];
                        symbol.style.backgroundImage = `url('assets/symbols/${newSymbol.id}.png')`;
                        symbol.dataset.symbolId = newSymbol.id;
                        
                        // Add a bounce effect
                        symbol.style.animation = 'bounceIn 0.5s';
                        setTimeout(() => {
                            symbol.style.animation = '';
                        }, 500);
                    });
                    
                    // If this is the last reel, resolve the promise
                    if (reelIndex === reels.length - 1) {
                        setTimeout(() => {
                            resolve(finalGrid);
                        }, 500); // Wait for bounce animation to complete
                    }
                }, isQuickSpin ? 
                    (reelIndex * 100) + 200 : 
                    (reelIndex * 300) + spinDuration / 2);
            });
        });
    }
    
    /**
     * Highlight winning symbols
     * @param {Array} winningIndices - Indices of winning symbols
     */
    highlightWinningSymbols(winningIndices) {
        // Reset all symbols
        this.symbolElements.forEach(symbol => {
            symbol.classList.remove('win');
        });
        
        // Highlight winning symbols
        winningIndices.forEach(index => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const symbolIndex = col * 3 + row;
            
            const symbol = this.symbolElements[symbolIndex];
            if (symbol) {
                symbol.classList.add('win');
            }
        });
    }
}

// Create global symbol manager instance
const symbolManager = new SymbolManager();