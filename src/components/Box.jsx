import { useStore } from '../store/store';
import Row from './Row';
import styles from './styles/Box.module.css'

const Box = () => {

  const arrLetters = useStore(state => state.arrLetters)
  const wordLength = useStore(state => state.wordLength)

  const objStyle = {
    maxWidth: `${wordLength > 3 ? 4*wordLength : 9*wordLength}em`
  }

  return (
    <div className={styles.box} style={objStyle}>
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
