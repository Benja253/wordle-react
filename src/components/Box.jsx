import { useEffect, useState } from 'react';
import { useStore } from '../store/store';
import Row from './Row';
import styles from './styles/Box.module.css'

const Box = () => {

  const arrLetters = useStore(state => state.arrLetters)
  const wordLength = useStore(state => state.wordLength)

  const [heightWindows, setHeightWindows] = useState()

  useEffect(() => {
    if(heightWindows === undefined) {
      setHeightWindows(window.innerHeight)
    }
    window.addEventListener('resize', () => {
      setHeightWindows(window.innerHeight)
    })
    return () => window.addEventListener('resize', () => {})
  }, [])

  const objStyle = {
    maxWidth: `${wordLength > 3 ? 4*wordLength : 9*wordLength}em`,
    gridTemplateColumns: `${(heightWindows <= 840 && wordLength == 2)|| (heightWindows <= 780 && wordLength == 3) ? 'repeat(2, 1fr)' : ''}`
  }

  return (
    <div id='box' className={styles.box} style={objStyle}>
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
