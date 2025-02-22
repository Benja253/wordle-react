import { useStore } from '../store/store';
import Row from './Row';
import styles from './styles/Box.module.css'

const Box = () => {

  const arrLetters = useStore(state => state.arrLetters)

  return (
    <div className={styles.box}>
      {
        arrLetters.map((row, rowNumber) => (
          <Row
            key={rowNumber}
            styles={styles} 
            row={row}
            rowNumber={rowNumber}
          />
        ))
      }
    </div>
  );
};

export default Box;
