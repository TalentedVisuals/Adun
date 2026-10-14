// Web Audio API ambient vinyl and atmospheric lounge sound generator
class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private crackleNode: AudioBufferSourceNode | null = null;
  private chordInterval: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const safeVol = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setValueAtTime(safeVol * 0.35, this.ctx.currentTime);
    }
  }

  private start() {
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    // 1. Generate Warm Vinyl Crackle Buffer
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Occasional needle pop / dust tick
      if (Math.random() < 0.0018) {
        data[i] = (Math.random() * 2 - 1) * 0.45;
      } else {
        // Soft analog surface hiss
        data[i] = (Math.random() * 2 - 1) * 0.025;
      }
    }

    this.crackleNode = this.ctx.createBufferSource();
    this.crackleNode.buffer = buffer;
    this.crackleNode.loop = true;

    const crackleFilter = this.ctx.createBiquadFilter();
    crackleFilter.type = 'bandpass';
    crackleFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    crackleFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    const crackleGain = this.ctx.createGain();
    crackleGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    this.crackleNode.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(this.masterGain);
    this.crackleNode.start();

    // 2. Play warm gentle Rhodes/Hearth chord pads every few seconds
    this.playMellowChord();
    this.chordInterval = window.setInterval(() => {
      if (this.isPlaying) {
        this.playMellowChord();
      }
    }, 7000);
  }

  private playMellowChord() {
    if (!this.ctx || !this.masterGain) return;
    // Sophisticated jazz voicings (D minor 9, G 13, C maj 9)
    const chords = [
      [146.83, 220.00, 261.63, 329.63], // Dm9
      [130.81, 196.00, 246.94, 329.63], // Cmaj9
      [164.81, 246.94, 293.66, 392.00], // Em9
      [174.61, 261.63, 329.63, 440.00], // Fmaj9
    ];
    const chord = chords[Math.floor(Math.random() * chords.length)];

    chord.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 6.5);
    });
  }

  private stop() {
    this.isPlaying = false;
    if (this.crackleNode) {
      try {
        this.crackleNode.stop();
        this.crackleNode.disconnect();
      } catch {
        // ignore
      }
      this.crackleNode = null;
    }
    if (this.chordInterval) {
      clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
  }
}

export const audioVibe = new AmbientAudioEngine();
