import Cell from '../types/Cell';

function shuffleArrayWithException(arr: Cell[], exceptionIndex: number) {
  const copiedArray = [...arr];

  const elementToPreserve = copiedArray.splice(exceptionIndex, 1)[0];

  for (let i = copiedArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }

  copiedArray.splice(exceptionIndex, 0, elementToPreserve);

  return copiedArray.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });
}

export default shuffleArrayWithException;
