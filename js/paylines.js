/**
 * Payline Manager
 * Handles win detection and payline highlighting
 */
class PaylineManager {
    constructor() {
        this.paylines = CONFIG.paylines;
    }
    
    /**
     * Check for wins on the grid
     * @param {Array} grid - Grid of symbols
     * @returns {Object} - Win information
     */
    checkWins(grid) {
        let totalWin = 0;
        const winningLines = [];
        const winningIndices = [];
        
        // Check each payline
        this.paylines.forEach((payline, lineIndex) => {
            const lineSymbols = payline.map(index => grid[index]);
            const lineWin = this.checkPaylineWin(lineSymbols, payline);
            
            if (lineWin.win) {
                totalWin += lineWin.amount;
                winningLines.push(lineIndex);
                winningIndices.push(...payline);
            }
        });
        
        return {
            win: totalWin > 0,
            amount: totalWin,
            lines: winningLines,
            indices: [...new Set(winningIndices)] // Remove duplicates
        };
    }
    
    /**
     * Check if a payline has a win
     * @param {Array} symbols - Symbols on the payline
     * @param {Array} indices - Indices of the payline
     * @returns {Object} - Win information
     */
    checkPaylineWin(symbols, indices) {
        const bet = storageManager.getBet();
        
        // Check for 3 matching symbols
        if (symbols[0].id === symbols[1].id && symbols[1].id === symbols[2].id) {
            return {
                win: true,
                amount: bet * CONFIG.winMultipliers.three * symbols[0].value,
                type: 'three',
                symbol: symbols[0].id,
                indices: indices
            };
        }
        
        // Check for 2 matching symbols
        if (symbols[0].id === symbols[1].id) {
            return {
                win: true,
                amount: bet * CONFIG.winMultipliers.two * symbols[0].value,
                type: 'two',
                symbol: symbols[0].id,
                indices: [indices[0], indices[1]]
            };
        }
        
        if (symbols[1].id === symbols[2].id) {
            return {
                win: true,
                amount: bet * CONFIG.winMultipliers.two * symbols[1].value,
                type: 'two',
                symbol: symbols[1].id,
                indices: [indices[1], indices[2]]
            };
        }
        
        // No win
        return {
            win: false,
            amount: 0
        };
    }
}

// Create global payline manager instance
const paylineManager = new PaylineManager();