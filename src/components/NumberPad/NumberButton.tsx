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
        {remaining > 0 && (
          <>
            <span className="numpad-dots-row">
              {Array.from({ length: Math.min(remaining, 5) }, (_, i) => (
                <span key={i} className="numpad-dot" />
              ))}
            </span>
            {remaining > 5 && (
              <span className="numpad-dots-row">
                {Array.from({ length: remaining - 5 }, (_, i) => (
                  <span key={i} className="numpad-dot" />
                ))}
              </span>
            )}
          </>
        )}
      </span>
      <span className="numpad-digit">{digit}</span>
    </button>
  );
}
