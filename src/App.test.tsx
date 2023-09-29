import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import jsonConfig from './gameConfigs';

describe('App', () => {
  // it('Renders Hello World!', () => {
  //   // ARRANGE
  //   render(<App />);
  //   // ACT
  //   // EXPECT
  //   expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
  //     'Hello World!'
  //   );
  // });
  it('Have all the tiles', () => {
    render(<App />);
    const texts = jsonConfig.default.map((item) => {
      return item.text;
    });
    texts.forEach((text) => {
      expect(
        screen.getByRole('button', { name: new RegExp(`.*${text}.*`) })
      ).toBeVisible();
    });
  });

  it('Add selected class after click', () => {
    render(<App />);
    const texts = jsonConfig.default.map((item) => {
      return item.text;
    });
    const excludedIndex = 12;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * texts.length);
    } while (randomIndex === excludedIndex);

    const randomTileText = texts[randomIndex];
    const htmlElement = screen.getByRole('button', {
      name: new RegExp(`.*${randomTileText}.*`),
    });

    expect(htmlElement).toHaveClass('unselected');

    fireEvent(
      htmlElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(
      screen.getByRole('button', { name: new RegExp(`.*${randomTileText}.*`) })
    ).toHaveClass('selected');
  });

  it('Restart button unselect every tile', () => {
    render(<App />);
    const texts = jsonConfig.default.map((item) => {
      return item.text;
    });

    const restartBtn = screen.getByRole('button', {
      name: /Restart/i,
    });

    fireEvent(
      restartBtn,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    texts.forEach((text, index) => {
      if (index !== 12) {
        expect(
          screen.getByRole('button', { name: new RegExp(`.*${text}.*`) })
        ).toHaveClass('unselected');
      }
    });
  });
});
