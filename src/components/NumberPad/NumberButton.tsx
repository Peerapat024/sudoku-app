import './NumberPad.css';

interface NumberButtonProps {
  digit: number;
  remaining: number;
  onTap: (digit: number) => void;
}

export default function NumberButton({ digit, remaining, onTap }: NumberButtonProps) {
  const exhausted = remaining <= 0;

  return (
    <button
      className={`numpad-btn ${exhausted ? 'numpad-btn--exhausted' : ''}`}
      onClick={() => !exhausted && onTap(digit)}
      disabled={exhausted}
    >
      <span className="numpad-dots">
        {remaining > 0
          ? Array.from({ length: remaining }, (_, i) => (
              <span key={i} className="numpad-dot" />
            ))
          : null}
      </span>
      <span className="numpad-digit">{digit}</span>
    </button>
  );
}
