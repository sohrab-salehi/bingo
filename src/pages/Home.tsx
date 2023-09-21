import { useState } from 'react';
import jsonConfig from '../gameConfigs';

interface Cell {
  id: number;
  text: string;
  selected: boolean;
}

function Home() {
  const [cells, setCells] = useState(jsonConfig.default);

  const checkBingo = (currentCells: Cell[]) => {
    const selectedCells = currentCells
      .filter((item) => item.selected === true)
      .map((item) => item.id);

    // Check rows and columns
    for (let i = 0; i < 5; i += 1) {
      const row = selectedCells.filter(
        (cell) => cell >= i * 5 + 1 && cell <= (i + 1) * 5
      );
      const column = selectedCells.filter((cell) => cell % 5 === i);

      if (row.length === 5) {
        console.log(`Bingo in row ${i + 1}`);
      }

      if (column.length === 5) {
        console.log(`Bingo in column ${i}`);
      }
    }

    // Check main diagonal
    const mainDiagonal = selectedCells.filter((cell) =>
      [1, 7, 19, 25].includes(cell)
    );
    if (mainDiagonal.length === 4) {
      console.log('Bingo in main diagonal');
    }

    const antiDiagonal = selectedCells.filter((cell) =>
      [5, 9, 17, 21].includes(cell)
    );
    if (antiDiagonal.length === 4) {
      console.log('Bingo in anti-diagonal');
    }
  };

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
    checkBingo(newCells);
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
