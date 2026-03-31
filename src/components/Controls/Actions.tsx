import { useGame } from '../../context/GameContext';
import { sounds } from '../../lib/sounds';
import './Controls.css';

export default function Actions() {
  const { state, dispatch } = useGame();
  const { history, isComplete, isNotesMode, selectedCell } = state.sudoku;

  return (
    <div className="actions">
      <button
        className="action-btn"
        onClick={() => { sounds.undo(); dispatch({ type: 'SUDOKU_UNDO' }); }}
        disabled={history.length <= 1 || isComplete}
      >
        <span className="action-icon">↩</span>
        <span className="action-label">Undo</span>
      </button>

      <button
        className={`action-btn ${isNotesMode ? 'action-btn--active' : ''}`}
        onClick={() => { sounds.tap(); dispatch({ type: 'SUDOKU_TOGGLE_NOTES_MODE' }); }}
        disabled={isComplete}
      >
        <span className="action-icon">✏</span>
        <span className="action-label">Notes</span>
      </button>

      <button
        className="action-btn"
        onClick={() => { sounds.hint(); dispatch({ type: 'SUDOKU_HINT' }); }}
        disabled={!selectedCell || isComplete}
      >
        <span className="action-icon">💡</span>
        <span className="action-label">Hint</span>
      </button>
    </div>
  );
}
