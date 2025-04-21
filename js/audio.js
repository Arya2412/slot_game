/**
 * Audio Manager
 * Handles all game sounds
 */
class AudioManager {
    constructor() {
        this.sounds = {
            spin: document.getElementById('spin-sound'),
            win: document.getElementById('win-sound'),
            bigWin: document.getElementById('big-win-sound'),
            buttonClick: document.getElementById('button-click'),
            freeSpins: document.getElementById('free-spins-sound')
        };
        
        this.enabled = storageManager.getSoundEnabled();
        this.updateSoundButton();
    }
    
    /**
     * Initialize audio manager
     */
    initialize() {
        // Set volume for all sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = CONFIG.sounds.volume;
        });
        
        // Add event listener to sound button
        const soundBtn = document.getElementById('sound-btn');
        soundBtn.addEventListener('click', () => {
            this.toggleSound();
            this.playSound('buttonClick');
        });
    }
    
    /**
     * Play a sound
     * @param {string} soundName - Name of the sound to play
     */
    playSound(soundName) {
        if (!this.enabled) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        }
    }
    
    /**
     * Stop a sound
     * @param {string} soundName - Name of the sound to stop
     */
    stopSound(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
    
    /**
     * Toggle sound on/off
     */
    toggleSound() {
        this.enabled = !this.enabled;
        storageManager.setSoundEnabled(this.enabled);
        this.updateSoundButton();
    }
    
    /**
     * Update sound button icon
     */
    updateSoundButton() {
        const soundBtn = document.getElementById('sound-btn');
        if (soundBtn) {
            soundBtn.querySelector('.btn-icon').textContent = this.enabled ? '🔊' : '🔇';
        }
    }
}

// Create global audio manager instance
const audioManager = new AudioManager();