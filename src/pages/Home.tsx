import jsonConfig from '../gameConfigs';

interface Cell {
  id: number;
  text: string;
}

function Home() {
  const createBoard = () => {
    const board: JSX.Element[] = [];
    const cells: Cell[] = jsonConfig.default;

    for (let i = 0; i < 5; i += 1) {
      const row = (
        <div className="flex-container">
          {cells.slice(i * 5, (i + 1) * 5).map((cell: Cell) => (
            <div key={cell.id}>{cell.text}</div>
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
