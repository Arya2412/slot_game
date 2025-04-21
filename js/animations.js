/**
 * Animation Manager
 * Handles all game animations
 */
class AnimationManager {
    constructor() {
        this.winAnimationElement = document.getElementById('win-animation');
        this.winAmountDisplay = document.querySelector('.win-amount-display');
        this.freeSpinsNotification = document.getElementById('free-spins-notification');
        this.insufficientBalanceNotification = document.getElementById('insufficient-balance');
    }
    
    /**
     * Show splash screen animation
     * @returns {Promise} - Promise that resolves when animation is complete
     */
    showSplashScreen() {
        return new Promise((resolve) => {
            const splashScreen = document.getElementById('splash-screen');
            const loadingProgress = document.querySelector('.loading-progress');
            
            // Animate loading bar
            setTimeout(() => {
                loadingProgress.style.width = '100%';
            }, 100);
            
            // Hide splash screen after delay
            setTimeout(() => {
                splashScreen.style.animation = 'fadeOut 0.5s forwards';
                
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                    document.getElementById('game-container').classList.remove('hidden');
                    resolve();
                }, 500);
            }, CONFIG.animationDurations.splash);
        });
    }
    
    /**
     * Show win animation
     * @param {number} amount - Win amount
     * @returns {Promise} - Promise that resolves when animation is complete
     */
    showWinAnimation(amount) {
        return new Promise((resolve) => {
            // Set win amount
            this.winAmountDisplay.textContent = amount.toFixed(2);
            
            // Show win animation
            this.winAnimationElement.classList.remove('hidden');
            this.winAnimationElement.classList.add('show');
            
            // Create coin animation
            this.createCoinAnimation();
            
            // Hide win animation after delay
            setTimeout(() => {
                this.winAnimationElement.classList.remove('show');
                this.winAnimationElement.classList.add('hide');
                
                setTimeout(() => {
                    this.winAnimationElement.classList.add('hidden');
                    this.winAnimationElement.classList.remove('hide');
                    resolve();
                }, 500);
            }, CONFIG.animationDurations.win);
        });
    }
    
    /**
     * Create coin animation
     */
    createCoinAnimation() {
        const container = document.body;
        const coinCount = 30;
        
        for (let i = 0; i < coinCount; i++) {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            
            // Random position
            const left = Math.random() * 100;
            coin.style.left = `${left}%`;
            
            // Random delay
            const delay = Math.random() * 1;
            coin.style.animationDelay = `${delay}s`;
            
            // Add to container
            container.appendChild(coin);
            
            // Remove after animation
            setTimeout(() => {
                container.removeChild(coin);
            }, 2000 + (delay * 1000));
        }
    }
    
    /**
     * Show free spins notification
     * @returns {Promise} - Promise that resolves when animation is complete
     */
    showFreeSpinsNotification() {
        return new Promise((resolve) => {
            // Show notification
            this.freeSpinsNotification.classList.remove('hidden');
            this.freeSpinsNotification.classList.add('show');
            
            // Hide notification after delay
            setTimeout(() => {
                this.freeSpinsNotification.classList.remove('show');
                this.freeSpinsNotification.classList.add('hide');
                
                setTimeout(() => {
                    this.freeSpinsNotification.classList.add('hidden');
                    this.freeSpinsNotification.classList.remove('hide');
                    resolve();
                }, 500);
            }, CONFIG.animationDurations.notification);
        });
    }
    
    /**
     * Show insufficient balance notification
     * @returns {Promise} - Promise that resolves when animation is complete
     */
    showInsufficientBalanceNotification() {
        return new Promise((resolve) => {
            // Show notification
            this.insufficientBalanceNotification.classList.remove('hidden');
            this.insufficientBalanceNotification.classList.add('show');
            
            // Hide notification after delay
            setTimeout(() => {
                this.insufficientBalanceNotification.classList.remove('show');
                this.insufficientBalanceNotification.classList.add('hide');
                
                setTimeout(() => {
                    this.insufficientBalanceNotification.classList.add('hidden');
                    this.insufficientBalanceNotification.classList.remove('hide');
                    resolve();
                }, 500);
            }, CONFIG.animationDurations.notification);
        });
    }
    
    /**
     * Highlight win lines
     * @param {Array} winLines - Winning paylines
     * @returns {Promise} - Promise that resolves when animation is complete
     */
    highlightWinLines(winLines) {
        return new Promise((resolve) => {
            const winLineElements = document.querySelectorAll('.win-line');
            
            // Reset all win lines
            winLineElements.forEach(line => {
                line.classList.remove('active');
            });
            
            // No winning lines
            if (winLines.length === 0) {
                resolve();
                return;
            }
            
            // Highlight winning lines
            winLines.forEach(lineIndex => {
                const lineElement = winLineElements[lineIndex];
                if (lineElement) {
                    lineElement.classList.add('active');
                }
            });
            
            // Resolve after animation duration
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }
}

// Create global animation manager instance
const animationManager = new AnimationManager();