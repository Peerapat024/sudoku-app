import { useGame } from '../../context/GameContext';
import './Controls.css';

export default function Actions() {
  const { state, dispatch } = useGame();

  return (
    <div className="actions">
      <button
        className="action-btn"
        onClick={() => dispatch({ type: 'UNDO' })}
        disabled={state.history.length <= 1 || state.isComplete}
      >
        <span className="action-icon">↩</span>
        <span className="action-label">Undo</span>
      </button>

      <button
        className={`action-btn ${state.isNotesMode ? 'action-btn--active' : ''}`}
        onClick={() => dispatch({ type: 'TOGGLE_NOTES_MODE' })}
        disabled={state.isComplete}
      >
        <span className="action-icon">✏</span>
        <span className="action-label">Notes</span>
      </button>

      <button
        className="action-btn"
        onClick={() => dispatch({ type: 'HINT' })}
        disabled={!state.selectedCell || state.isComplete}
      >
        <span className="action-icon">💡</span>
        <span className="action-label">Hint</span>
      </button>
    </div>
  );
}
