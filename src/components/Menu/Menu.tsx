import { useGame } from '../../context/GameContext';
import { Difficulty } from '../../types';
import { generatePuzzle } from '../../lib/generator';
import { getRecords, formatTime } from '../../lib/records';
import './Menu.css';

const difficulties: { key: Difficulty; label: string }[] = [
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
  { key: 'expert', label: 'Expert' },
];

export default function Menu() {
  const { dispatch } = useGame();
  const records = getRecords();

  function startGame(difficulty: Difficulty) {
    const { puzzle, solution } = generatePuzzle(difficulty);
    dispatch({ type: 'START_GAME', difficulty, puzzle, solution });
  }

  function getRecord(difficulty: Difficulty): string {
    const rec = records.find(r => r.difficulty === difficulty);
    return rec ? formatTime(rec.bestTime) : '--:--';
  }

  return (
    <div className="menu">
      <h1 className="menu-title">Sudoku</h1>
      <p className="menu-subtitle">Select difficulty</p>

      <div className="menu-buttons">
        {difficulties.map(({ key, label }) => (
          <button
            key={key}
            className={`menu-btn menu-btn--${key}`}
            onClick={() => startGame(key)}
          >
            <span className="menu-btn-label">{label}</span>
            <span className="menu-btn-record">Best: {getRecord(key)}</span>
          </button>
        ))}
      </div>

      {records.length > 0 && (
        <div className="menu-records">
          <h2>Personal Records</h2>
          <table>
            <thead>
              <tr>
                <th>Difficulty</th>
                <th>Best Time</th>
              </tr>
            </thead>
            <tbody>
              {difficulties.map(({ key, label }) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{getRecord(key)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
