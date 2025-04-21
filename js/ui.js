/**
 * UI Manager
 * Handles all UI interactions and updates
 */
class UIManager {
    constructor() {
        this.elements = {
            balanceDisplay: document.getElementById('balance'),
            betDisplay: document.getElementById('bet-amount'),
            winDisplay: document.getElementById('win-amount'),
            spinButton: document.getElementById('spin-btn'),
            autoSpinButton: document.getElementById('auto-spin-btn'),
            autoSpinCount: document.getElementById('auto-spin-count'),
            quickSpinButton: document.getElementById('quick-spin-btn'),
            betButton: document.getElementById('bet-btn'),
            addBalanceButton: document.getElementById('add-balance-btn'),
            menuButton: document.getElementById('menu-btn'),
            betModal: document.getElementById('bet-modal'),
            closeBetModal: document.getElementById('close-bet-modal'),
            betOptions: document.querySelectorAll('.bet-option'),
            autoSpinModal: document.getElementById('auto-spin-modal'),
            closeAutoSpinModal: document.getElementById('close-auto-spin-modal'),
            autoSpinOptions: document.querySelectorAll('.auto-spin-option'),
            historyModal: document.getElementById('history-modal'),
            closeHistoryModal: document.getElementById('close-history-modal'),
            historyTableBody: document.getElementById('history-table-body'),
            totalSpinsDisplay: document.getElementById('total-spins'),
            totalWinsDisplay: document.getElementById('total-wins'),
            totalSpentDisplay: document.getElementById('total-spent'),
            totalWonDisplay: document.getElementById('total-won')
        };
        
        this.isAutoSpinning = false;
        this.autoSpinCount = 0;
        this.autoSpinTotal = 0;
        this.quickSpinEnabled = storageManager.getQuickSpinEnabled();
        
        this.initializeUI();
    }
    
    /**
     * Initialize UI elements and event listeners
     */
    initializeUI() {
        // Update displays
        this.updateBalanceDisplay();
        this.updateBetDisplay();
        this.updateWinDisplay(0);
        this.updateStatsDisplay();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Update quick spin button
        this.updateQuickSpinButton();
    }
    
    /**
     * Set up event listeners for UI elements
     */
    setupEventListeners() {
        // Spin button
        this.elements.spinButton.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            game.spin();
        });
        
        // Auto spin button
        this.elements.autoSpinButton.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            
            if (this.isAutoSpinning) {
                this.stopAutoSpin();
            } else {
                this.showAutoSpinModal();
            }
        });
        
        // Quick spin button
        this.elements.quickSpinButton.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.toggleQuickSpin();
        });
        
        // Bet button
        this.elements.betButton.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.showBetModal();
        });
        
        // Add balance button
        this.elements.addBalanceButton.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.addBalance(5000);
        });
        
        // Menu button
        this.elements.menuButton.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.showHistoryModal();
        });
        
        // Close bet modal
        this.elements.closeBetModal.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.hideBetModal();
        });
        
        // Bet options
        this.elements.betOptions.forEach(option => {
            option.addEventListener('click', () => {
                audioManager.playSound('buttonClick');
                const bet = parseFloat(option.dataset.bet);
                this.setBet(bet);
                this.hideBetModal();
            });
        });
        
        // Close auto spin modal
        this.elements.closeAutoSpinModal.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.hideAutoSpinModal();
        });
        
        // Auto spin options
        this.elements.autoSpinOptions.forEach(option => {
            option.addEventListener('click', () => {
                audioManager.playSound('buttonClick');
                const spins = parseInt(option.dataset.spins);
                this.startAutoSpin(spins);
                this.hideAutoSpinModal();
            });
        });
        
        // Close history modal
        this.elements.closeHistoryModal.addEventListener('click', () => {
            audioManager.playSound('buttonClick');
            this.hideHistoryModal();
        });
    }
    
    /**
     * Update balance display
     */
    updateBalanceDisplay() {
        const balance = storageManager.getBalance();
        this.elements.balanceDisplay.textContent = balance.toFixed(2);
    }
    
    /**
     * Update bet display
     */
    updateBetDisplay() {
        const bet = storageManager.getBet();
        this.elements.betDisplay.textContent = bet.toFixed(2);
    }
    
    /**
     * Update win display
     * @param {number} amount - Win amount
     */
    updateWinDisplay(amount) {
        this.elements.winDisplay.textContent = amount.toFixed(2);
    }
    
    /**
     * Update stats display
     */
    updateStatsDisplay() {
        this.elements.totalSpinsDisplay.textContent = storageManager.getTotalSpins();
        this.elements.totalWinsDisplay.textContent = storageManager.getTotalWins();
        this.elements.totalSpentDisplay.textContent = storageManager.getTotalSpent().toFixed(2);
        this.elements.totalWonDisplay.textContent = storageManager.getTotalWon().toFixed(2);
    }
    
    /**
     * Show bet modal
     */
    showBetModal() {
        this.elements.betModal.classList.remove('hidden');
    }
    
    /**
     * Hide bet modal
     */
    hideBetModal() {
        this.elements.betModal.classList.add('hidden');
    }
    
    /**
     * Show auto spin modal
     */
    showAutoSpinModal() {
        this.elements.autoSpinModal.classList.remove('hidden');
    }
    
    /**
     * Hide auto spin modal
     */
    hideAutoSpinModal() {
        this.elements.autoSpinModal.classList.add('hidden');
    }
    
    /**
     * Show history modal
     */
    showHistoryModal() {
        // Update history table
        this.updateHistoryTable();
        
        // Show modal
        this.elements.historyModal.classList.remove('hidden');
    }
    
    /**
     * Hide history modal
     */
    hideHistoryModal() {
        this.elements.historyModal.classList.add('hidden');
    }
    
    /**
     * Update history table
     */
    updateHistoryTable() {
        // Clear table
        this.elements.historyTableBody.innerHTML = '';
        
        // Get history
        const history = storageManager.getWinHistory();
        
        // Add rows
        history.forEach((entry, index) => {
            const row = document.createElement('tr');
            
            // Spin number
            const spinCell = document.createElement('td');
            spinCell.textContent = index + 1;
            row.appendChild(spinCell);
            
            // Bet
            const betCell = document.createElement('td');
            betCell.textContent = entry.bet.toFixed(2);
            row.appendChild(betCell);
            
            // Win
            const winCell = document.createElement('td');
            winCell.textContent = entry.winAmount.toFixed(2);
            if (entry.winAmount > 0) {
                winCell.style.color = 'var(--win-color)';
            }
            row.appendChild(winCell);
            
            // Balance
            const balanceCell = document.createElement('td');
            balanceCell.textContent = entry.balance.toFixed(2);
            row.appendChild(balanceCell);
            
            // Add row to table
            this.elements.historyTableBody.appendChild(row);
        });
    }
    
    /**
     * Set bet amount
     * @param {number} bet - Bet amount
     */
    setBet(bet) {
        // Validate bet
        if (bet < CONFIG.minBet) {
            bet = CONFIG.minBet;
        } else if (bet > CONFIG.maxBet) {
            bet = CONFIG.maxBet;
        }
        
        // Update storage
        storageManager.setBet(bet);
        
        // Update display
        this.updateBetDisplay();
    }
    
    /**
     * Add balance
     * @param {number} amount - Amount to add
     */
    addBalance(amount) {
        const currentBalance = storageManager.getBalance();
        storageManager.setBalance(currentBalance + amount);
        this.updateBalanceDisplay();
    }
    
    /**
     * Start auto spin
     * @param {number} spins - Number of spins
     */
    startAutoSpin(spins) {
        this.isAutoSpinning = true;
        this.autoSpinCount = 0;
        this.autoSpinTotal = spins;
        
        // Update button
        this.elements.autoSpinButton.querySelector('.btn-icon').textContent = '⏹️';
        this.elements.autoSpinCount.textContent = spins;
        this.elements.autoSpinCount.classList.remove('hidden');
        
        // Start spinning
        game.autoSpin();
    }
    
    /**
     * Stop auto spin
     */
    stopAutoSpin() {
        this.isAutoSpinning = false;
        
        // Update button
        this.elements.autoSpinButton.querySelector('.btn-icon').textContent = '🔄';
        this.elements.autoSpinCount.classList.add('hidden');
    }
    
    /**
     * Update auto spin count
     */
    updateAutoSpinCount() {
        this.autoSpinCount++;
        const remaining = this.autoSpinTotal - this.autoSpinCount;
        this.elements.autoSpinCount.textContent = remaining;
        
        // Check if auto spin is complete
        if (this.autoSpinCount >= this.autoSpinTotal) {
            this.stopAutoSpin();
            return true;
        }
        
        return false;
    }
    
    /**
     * Toggle quick spin
     */
    toggleQuickSpin() {
        this.quickSpinEnabled = !this.quickSpinEnabled;
        storageManager.setQuickSpinEnabled(this.quickSpinEnabled);
        this.updateQuickSpinButton();
    }
    
    /**
     * Update quick spin button
     */
    updateQuickSpinButton() {
        if (this.quickSpinEnabled) {
            this.elements.quickSpinButton.classList.add('active');
            this.elements.quickSpinButton.querySelector('.btn-icon').textContent = '⚡';
        } else {
            this.elements.quickSpinButton.classList.remove('active');
            this.elements.quickSpinButton.querySelector('.btn-icon').textContent = '🐢';
        }
    }
    
    /**
     * Disable spin button
     */
    disableSpinButton() {
        this.elements.spinButton.disabled = true;
        this.elements.spinButton.classList.add('disabled');
    }
    
    /**
     * Enable spin button
     */
    enableSpinButton() {
        this.elements.spinButton.disabled = false;
        this.elements.spinButton.classList.remove('disabled');
    }
    
    /**
     * Check if auto spin is active
     * @returns {boolean} - Whether auto spin is active
     */
    isAutoSpinActive() {
        return this.isAutoSpinning;
    }
    
    /**
     * Check if quick spin is enabled
     * @returns {boolean} - Whether quick spin is enabled
     */
    isQuickSpinEnabled() {
        return this.quickSpinEnabled;
    }
}

// Create global UI manager instance
const uiManager = new UIManager();