import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const SORT_ALPHABETICALLY = 'alphabetically';
  const SORT_BY_LENGTH = 'sort by length';
  const REVERSE = 'reverse';
  const RESET = 'reset';
  const [sort, setSort] = useState('');
  const [reversePressed, setreversePressed] = useState(false);
  const [alphPressed, setalphPressed] = useState(false);
  const [lengthPressed, setlengthPressed] = useState(false);
  const [sortedGoods, setsortedGoods] = useState([...goodsFromServer]);

  const handleSort = type => {
    let newGoods = [...goodsFromServer];

    if (reversePressed) {
      switch (type) {
        case SORT_ALPHABETICALLY:
          newGoods.sort((good1, good2) => good2.localeCompare(good1));
          setlengthPressed(false);
          break;
        case SORT_BY_LENGTH:
          newGoods = [...sortedGoods].sort(
            (good1, good2) => good2.length - good1.length,
          );
          setalphPressed(false);

          break;
        case REVERSE:
          newGoods = [...sortedGoods].reverse();
          break;
        case RESET:
          newGoods = [...goodsFromServer];
          setreversePressed(false);
          setalphPressed(false);
          setlengthPressed(false);
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case SORT_ALPHABETICALLY:
          newGoods.sort((good1, good2) => good1.localeCompare(good2));
          setlengthPressed(false);
          break;
        case SORT_BY_LENGTH:
          newGoods.sort((good1, good2) => good1.length - good2.length);
          setalphPressed(false);

          break;
        case REVERSE:
          newGoods = [...sortedGoods].reverse();
          break;
        case RESET:
          newGoods = [...goodsFromServer];
          setreversePressed(false);
          setalphPressed(false);
          setlengthPressed(false);
          break;
        default:
          break;
      }
    }

    setsortedGoods(newGoods);
    setSort(type);
  };

  const resetButton = () => {
    return (
      <button
        type="button"
        className="button is-danger"
        onClick={() => {
          handleSort(RESET);
        }}
      >
        Reset
      </button>
    );
  };

 

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': alphPressed !== true,
            NOT_ACTIVE_CLASS: sort !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            handleSort(SORT_ALPHABETICALLY);
            setalphPressed(!alphPressed);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            handleSort(SORT_BY_LENGTH);
            setlengthPressed(!lengthPressed);
          }}
          className={classNames('button is-success', {
            'is-light': lengthPressed !== true,
            NOT_ACTIVE_CLASS: sort !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': reversePressed !== true,
            NOT_ACTIVE_CLASS: sort !== REVERSE,
          })}
          onClick={() => {
            handleSort(REVERSE);
            setreversePressed(!reversePressed);
          }}
        >
          Reverse
        </button>

        {sort !== RESET &&
        JSON.stringify(sortedGoods) !== JSON.stringify(goodsFromServer)
          ? resetButton()
          : null}
      </div>
      <ul>
        {sortedGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
