import { useGame } from '../../context/GameContext';
import { useHighlight } from '../../hooks/useHighlight';
import Cell from './Cell';
import './Board.css';

export default function Board() {
  const { state, dispatch } = useGame();
  const { board, selectedCell } = state;
  const { regionCells, sameValueCells } = useHighlight(board, selectedCell);

  function handleSelect(row: number, col: number) {
    dispatch({ type: 'SELECT_CELL', row, col });
  }

  return (
    <div className="board">
      {board.map((row, r) =>
        row.map((cell, c) => {
          const key = `${r},${c}`;
          return (
            <Cell
              key={key}
              cell={cell}
              row={r}
              col={c}
              isSelected={selectedCell !== null && selectedCell[0] === r && selectedCell[1] === c}
              isRegionHighlight={regionCells.has(key)}
              isSameValue={sameValueCells.has(key)}
              onSelect={handleSelect}
            />
          );
        })
      )}
    </div>
  );
}
