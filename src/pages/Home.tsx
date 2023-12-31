import { useState } from 'react';
import Confetti from 'react-confetti';

import jsonConfig from '../gameConfigs';
import Cell from '../types/Cell';
import shuffleArrayWithException from '../utility/functions';

function Home() {
  const [cells, setCells] = useState(
    shuffleArrayWithException(jsonConfig.default, 12)
  );
  const [isWinner, setIsWinner] = useState(false);
  const [bingoLoc, setBingoLoc] = useState<string[]>([]);

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

      if (row.length === 5 && !bingoLoc.includes(`row_${i}`)) {
        setBingoLoc([...bingoLoc, `row_${i}`]);
        setIsWinner(true);
      }

      if (column.length === 5 && !bingoLoc.includes(`col_${i}`)) {
        setBingoLoc([...bingoLoc, `col_${i}`]);
        setIsWinner(true);
      }
    }

    // Check main diagonal
    const mainDiagonal = selectedCells.filter((cell) =>
      [1, 7, 19, 25].includes(cell)
    );
    if (mainDiagonal.length === 4 && !bingoLoc.includes('diag')) {
      setBingoLoc([...bingoLoc, 'diag']);
      setIsWinner(true);
    }

    // Check anti diagonal
    const antiDiagonal = selectedCells.filter((cell) =>
      [5, 9, 17, 21].includes(cell)
    );
    if (antiDiagonal.length === 4 && !bingoLoc.includes('a_diag')) {
      setBingoLoc([...bingoLoc, 'a_diag']);
      setIsWinner(true);
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

  const resetGame = () => {
    setCells(shuffleArrayWithException(jsonConfig.default, 12));
    setIsWinner(false);
  };

  const createBoard = () => {
    const board: JSX.Element[] = [];

    for (let i = 0; i < 5; i += 1) {
      const row = (
        <div key={`row_${i + 1}`} className="flex-container">
          {cells.slice(i * 5, (i + 1) * 5).map((cell: Cell) => (
            <div key={cell.id} className={cell.id === 13 ? 'center-cell' : ''}>
              {cell.id === 13 ? (
                <button type="button" className={isWinner ? 'win' : ''}>
                  <span className="cell-text">
                    {isWinner ? (
                      <Confetti
                        data-testid="animation"
                        numberOfPieces={500}
                        recycle={false}
                        onConfettiComplete={() => setIsWinner(false)}
                      />
                    ) : null}
                    {cell.text} <br /> &#128567;
                  </span>
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

  return (
    <div>
      <button className="restart-btn" type="button" onClick={resetGame}>
        Restart
      </button>
      {createBoard()}
    </div>
  );
}

export default Home;
