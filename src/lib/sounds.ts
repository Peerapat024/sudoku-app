/* ── Web Audio sound engine ─────────────────────────────────────────────────
   All sounds generated via oscillators — no audio files needed.
   AudioContext is created lazily on first user gesture.
────────────────────────────────────────────────────────────────────────────── */

let ctx: AudioContext | null = null;

const getCtx = (): AudioContext => {
  if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  return ctx;
};

const tone = (
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainVal = 0.18,
  startDelay = 0,
) => {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.connect(g);
    g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + startDelay);
    g.gain.setValueAtTime(0, c.currentTime + startDelay);
    g.gain.linearRampToValueAtTime(gainVal, c.currentTime + startDelay + 0.004);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startDelay + duration);
    osc.start(c.currentTime + startDelay);
    osc.stop(c.currentTime + startDelay + duration + 0.01);
  } catch { /* ignore if audio not available */ }
};

export const sounds = {
  // Short click — tapping a cell
  tap: () => tone(900, 0.055, 'sine', 0.12),

  // Satisfying thud — placing a number
  place: () => {
    tone(520, 0.09, 'sine', 0.2);
    tone(780, 0.06, 'sine', 0.08);
  },

  // Soft descending pop — erasing
  erase: () => {
    tone(480, 0.04, 'sine', 0.12);
    tone(320, 0.07, 'sine', 0.08, 0.03);
  },

  // Buzzy error — conflict detected
  conflict: () => {
    tone(160, 0.06, 'square', 0.12);
    tone(120, 0.09, 'square', 0.10, 0.05);
  },

  // Light high tap — adding a note
  note: () => tone(1400, 0.04, 'sine', 0.07),

  // Undo — reverse-feel descending pair
  undo: () => {
    tone(440, 0.06, 'sine', 0.12);
    tone(330, 0.08, 'sine', 0.10, 0.05);
  },

  // Hint — gentle ascending chime
  hint: () => {
    tone(660, 0.08, 'sine', 0.14);
    tone(880, 0.10, 'sine', 0.12, 0.07);
  },

  // Quiet completion — gentle ascending arpeggio
  complete: () => {
    [[523, 0], [659, 0.09], [784, 0.18], [1047, 0.28]].forEach(([freq, delay]) => {
      tone(freq as number, 0.35, 'sine', 0.18, delay as number);
    });
  },
};
