/**
 * Game Manager
 * Main game logic controller
 */
class Game {
    constructor() {
        this.isSpinning = false;
        this.currentGrid = [];
    }
    
    /**
     * Initialize the game
     */
    async initialize() {
        // Show splash screen
        await animationManager.showSplashScreen();
        
        // Initialize symbols
        symbolManager.initializeSymbols();
        
        // Initialize audio
        audioManager.initialize();
        
        // Add pulse animation to spin button
        document.getElementById('spin-btn').classList.add('pulse');
    }
    
    /**
     * Spin the reels
     */
    async spin() {
        // Check if already spinning
        if (this.isSpinning) return;
        
        // Get current balance and bet
        const balance = storageManager.getBalance();
        const bet = storageManager.getBet();
        const freeSpins = storageManager.getFreeSpinsRemaining();
        
        // Check if free spins are available
        const isFreeSpinActive = freeSpins > 0;
        
        // Check if balance is sufficient
        if (!isFreeSpinActive && balance < bet) {
            await animationManager.showInsufficientBalanceNotification();
            return;
        }
        
        // Set spinning flag
        this.isSpinning = true;
        
        // Remove pulse animation from spin button
        document.getElementById('spin-btn').classList.remove('pulse');
        
        // Disable spin button
        uiManager.disableSpinButton();
        
        // Update balance if not a free spin
        if (!isFreeSpinActive) {
            storageManager.setBalance(balance - bet);
            storageManager.addToTotalSpent(bet);
            uiManager.updateBalanceDisplay();
        } else {
            // Decrement free spins
            storageManager.setFreeSpinsRemaining(freeSpins - 1);
        }
        
        // Reset win display
        uiManager.updateWinDisplay(0);
        
        // Play spin sound
        audioManager.playSound('spin');
        
        // Spin the reels
        const isQuickSpin = uiManager.isQuickSpinEnabled();
        this.currentGrid = await symbolManager.spinReels(isQuickSpin);
        
        // Check for wins
        const winResult = paylineManager.checkWins(this.currentGrid);
        
        // Update total spins
        storageManager.incrementTotalSpins();
        
        // Handle win
        if (winResult.win) {
            // Update balance
            const newBalance = storageManager.getBalance() + winResult.amount;
            storageManager.setBalance(newBalance);
            storageManager.addToTotalWon(winResult.amount);
            storageManager.incrementTotalWins();
            
            // Update display
            uiManager.updateBalanceDisplay();
            uiManager.updateWinDisplay(winResult.amount);
            
            // Highlight winning symbols
            symbolManager.highlightWinningSymbols(winResult.indices);
            
            // Highlight winning lines
            await animationManager.highlightWinLines(winResult.lines);
            
            // Play win sound
            audioManager.playSound(winResult.amount >= bet * 5 ? 'bigWin' : 'win');
            
            // Show win animation for big wins
            if (winResult.amount >= bet * 5) {
                await animationManager.showWinAnimation(winResult.amount);
            }
        }
        
        // Add to history
        storageManager.addToWinHistory({
            grid: this.currentGrid,
            bet: bet,
            winAmount: winResult.win ? winResult.amount : 0,
            balance: storageManager.getBalance()
        });
        
        // Update stats display
        uiManager.updateStatsDisplay();
        
        // Check for free spins award
        const totalSpent = storageManager.getTotalSpent();
        const freeSpinsRemaining = storageManager.getFreeSpinsRemaining();
        
        if (totalSpent >= CONFIG.freeSpinsThreshold && freeSpinsRemaining === 0) {
            // Award free spins
            storageManager.setFreeSpinsRemaining(CONFIG.freeSpinsAmount);
            
            // Show notification
            audioManager.playSound('freeSpins');
            await animationManager.showFreeSpinsNotification();
        }
        
        // Reset spinning flag
        this.isSpinning = false;
        
        // Enable spin button
        uiManager.enableSpinButton();
        
        // Continue auto spin if active
        if (uiManager.isAutoSpinActive()) {
            const isComplete = uiManager.updateAutoSpinCount();
            
            if (!isComplete) {
                // Wait a short delay before next spin
                setTimeout(() => {
                    this.autoSpin();
                }, 500);
            }
        }
    }
    
    /**
     * Auto spin
     */
    autoSpin() {
        // Check if auto spin is active
        if (!uiManager.isAutoSpinActive()) return;
        
        // Spin
        this.spin();
    }
}

// Create global game instance
const game = new Game();