import { useState } from 'react';
import jsonConfig from '../gameConfigs';

interface Cell {
  id: number;
  text: string;
  selected: boolean;
}

function Home() {
  const [cells, setCells] = useState(jsonConfig.default);

  const onClickCell = (cellId: number) => {
    const updatedCell = cells.find((item) => item.id === cellId);
    const newCells = cells.filter((item) => item.id !== cellId);
    if (updatedCell) {
      newCells.splice(updatedCell.id - 1, 0, {
        ...updatedCell,
        selected: true,
      });
    }
    setCells(newCells);
  };

  const createBoard = () => {
    const board: JSX.Element[] = [];

    for (let i = 0; i < 5; i += 1) {
      const row = (
        <div className="flex-container">
          {cells.slice(i * 5, (i + 1) * 5).map((cell: Cell) => (
            <div key={cell.id}>
              {cell.id === 13 ? (
                <button className="center-cell" type="button">
                  <span className="cell-text">{cell.text}</span>
                </button>
              ) : (
                <button
                  className={cell.selected ? 'selected' : 'unselected'}
                  onClick={() => onClickCell(cell.id)}
                  type="button"
                >
                  <span className="cell-text">{cell.text}</span>
                  <span className="cell-number">{cell.id}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      );
      board.push(row);
    }
    return board;
  };

  return <div>{createBoard()}</div>;
}

export default Home;
