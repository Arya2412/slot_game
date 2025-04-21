/**
 * Session Storage Manager
 * Handles saving and loading game state from session storage
 */
class StorageManager {
    constructor() {
        this.keys = {
            balance: 'hauntedSpins_balance',
            bet: 'hauntedSpins_bet',
            totalSpent: 'hauntedSpins_totalSpent',
            freeSpinsRemaining: 'hauntedSpins_freeSpinsRemaining',
            winHistory: 'hauntedSpins_winHistory',
            totalSpins: 'hauntedSpins_totalSpins',
            totalWins: 'hauntedSpins_totalWins',
            totalWon: 'hauntedSpins_totalWon',
            soundEnabled: 'hauntedSpins_soundEnabled',
            quickSpinEnabled: 'hauntedSpins_quickSpinEnabled'
        };
        
        this.initializeStorage();
    }
    
    /**
     * Initialize session storage with default values if not already set
     */
    initializeStorage() {
        if (!this.getItem(this.keys.balance)) {
            this.setItem(this.keys.balance, CONFIG.initialBalance);
        }
        
        if (!this.getItem(this.keys.bet)) {
            this.setItem(this.keys.bet, CONFIG.defaultBet);
        }
        
        if (!this.getItem(this.keys.totalSpent)) {
            this.setItem(this.keys.totalSpent, 0);
        }
        
        if (!this.getItem(this.keys.freeSpinsRemaining)) {
            this.setItem(this.keys.freeSpinsRemaining, 0);
        }
        
        if (!this.getItem(this.keys.winHistory)) {
            this.setItem(this.keys.winHistory, JSON.stringify([]));
        }
        
        if (!this.getItem(this.keys.totalSpins)) {
            this.setItem(this.keys.totalSpins, 0);
        }
        
        if (!this.getItem(this.keys.totalWins)) {
            this.setItem(this.keys.totalWins, 0);
        }
        
        if (!this.getItem(this.keys.totalWon)) {
            this.setItem(this.keys.totalWon, 0);
        }
        
        if (!this.getItem(this.keys.soundEnabled)) {
            this.setItem(this.keys.soundEnabled, true);
        }
        
        if (!this.getItem(this.keys.quickSpinEnabled)) {
            this.setItem(this.keys.quickSpinEnabled, false);
        }
    }
    
    /**
     * Get item from session storage
     * @param {string} key - Storage key
     * @returns {any} - Stored value
     */
    getItem(key) {
        const item = sessionStorage.getItem(key);
        
        if (item === null) {
            return null;
        }
        
        try {
            // Try to parse as JSON
            return JSON.parse(item);
        } catch (e) {
            // If not JSON, return as is
            return item;
        }
    }
    
    /**
     * Set item in session storage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    setItem(key, value) {
        if (typeof value === 'object') {
            sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, value);
        }
    }
    
    /**
     * Get current balance
     * @returns {number} - Current balance
     */
    getBalance() {
        return parseFloat(this.getItem(this.keys.balance));
    }
    
    /**
     * Set current balance
     * @param {number} balance - New balance
     */
    setBalance(balance) {
        this.setItem(this.keys.balance, balance);
    }
    
    /**
     * Get current bet
     * @returns {number} - Current bet
     */
    getBet() {
        return parseFloat(this.getItem(this.keys.bet));
    }
    
    /**
     * Set current bet
     * @param {number} bet - New bet
     */
    setBet(bet) {
        this.setItem(this.keys.bet, bet);
    }
    
    /**
     * Get total spent
     * @returns {number} - Total spent
     */
    getTotalSpent() {
        return parseFloat(this.getItem(this.keys.totalSpent));
    }
    
    /**
     * Add to total spent
     * @param {number} amount - Amount to add
     */
    addToTotalSpent(amount) {
        const currentTotal = this.getTotalSpent();
        this.setItem(this.keys.totalSpent, currentTotal + amount);
    }
    
    /**
     * Get free spins remaining
     * @returns {number} - Free spins remaining
     */
    getFreeSpinsRemaining() {
        return parseInt(this.getItem(this.keys.freeSpinsRemaining));
    }
    
    /**
     * Set free spins remaining
     * @param {number} spins - Free spins remaining
     */
    setFreeSpinsRemaining(spins) {
        this.setItem(this.keys.freeSpinsRemaining, spins);
    }
    
    /**
     * Get win history
     * @returns {Array} - Win history
     */
    getWinHistory() {
        return this.getItem(this.keys.winHistory) || [];
    }
    
    /**
     * Add entry to win history
     * @param {Object} entry - History entry
     */
    addToWinHistory(entry) {
        const history = this.getWinHistory();
        history.push(entry);
        this.setItem(this.keys.winHistory, history);
    }
    
    /**
     * Get total spins
     * @returns {number} - Total spins
     */
    getTotalSpins() {
        return parseInt(this.getItem(this.keys.totalSpins));
    }
    
    /**
     * Increment total spins
     */
    incrementTotalSpins() {
        const currentSpins = this.getTotalSpins();
        this.setItem(this.keys.totalSpins, currentSpins + 1);
    }
    
    /**
     * Get total wins
     * @returns {number} - Total wins
     */
    getTotalWins() {
        return parseInt(this.getItem(this.keys.totalWins));
    }
    
    /**
     * Increment total wins
     */
    incrementTotalWins() {
        const currentWins = this.getTotalWins();
        this.setItem(this.keys.totalWins, currentWins + 1);
    }
    
    /**
     * Get total won
     * @returns {number} - Total won
     */
    getTotalWon() {
        return parseFloat(this.getItem(this.keys.totalWon));
    }
    
    /**
     * Add to total won
     * @param {number} amount - Amount to add
     */
    addToTotalWon(amount) {
        const currentTotal = this.getTotalWon();
        this.setItem(this.keys.totalWon, currentTotal + amount);
    }
    
    /**
     * Get sound enabled setting
     * @returns {boolean} - Sound enabled
     */
    getSoundEnabled() {
        return this.getItem(this.keys.soundEnabled);
    }
    
    /**
     * Set sound enabled setting
     * @param {boolean} enabled - Sound enabled
     */
    setSoundEnabled(enabled) {
        this.setItem(this.keys.soundEnabled, enabled);
    }
    
    /**
     * Get quick spin enabled setting
     * @returns {boolean} - Quick spin enabled
     */
    getQuickSpinEnabled() {
        return this.getItem(this.keys.quickSpinEnabled);
    }
    
    /**
     * Set quick spin enabled setting
     * @param {boolean} enabled - Quick spin enabled
     */
    setQuickSpinEnabled(enabled) {
        this.setItem(this.keys.quickSpinEnabled, enabled);
    }
}

// Create global storage manager instance
const storageManager = new StorageManager();