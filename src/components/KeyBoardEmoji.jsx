import { animaldleObj } from '../bd/words'
import { useStore } from '../store/store'
import { compareWord } from '../utils'
import styles from './styles/KeyBoardEmoji.module.css'

const KeyBoardEmoji = () => {

  const arrLetters = useStore(state => state.arrLetters)
  const opportunitiesAndLetter = useStore(state => state.opportunitiesAndLetter)
  const wordSelected = useStore(state => state.wordSelected)
  const changeYouWon = useStore(state => state.changeYouWon)
  const changeRow = useStore(state => state.changeRow)
  const changeCell = useStore(state => state.changeCell)
  const cellActive = useStore(state => state.cellActive)
  const changeStatus = useStore(state => state.changeStatus)
  const wordLength = useStore(state => state.wordLength)
  const removeLetter = useStore(state => state.removeLetter)
  const addLetter = useStore(state => state.addLetter)

  const handleDel = () => {
    removeLetter()
  }

  const handleEnter = () => {
    const wordLengthWithEmoji = wordLength === 'animaldle' ? 5 : wordLength
    const { row } = cellActive
    const word = arrLetters[row].reduce((acc, cv) => {
      if(cv.value) {
        acc.push(cv.value)
      }
      return acc
    }, [])
    if(word.length === wordLengthWithEmoji) {
      const arrStatus = compareWord(word, wordSelected, changeYouWon)
      for(let i = 0; i < word.length; i++) {
        setTimeout(() => {
          changeStatus(arrStatus[i].status, i)
        }, 200 * i)
      }
      let index = opportunitiesAndLetter.findIndex(e => e.letters === 4)
      if(row + 1 < opportunitiesAndLetter[index].opportunities) {
        changeRow(row + 1)
      }
      if(row + 1 === opportunitiesAndLetter[index].opportunities && !arrStatus.every(e => e.status === 'perfect') && arrLetters[row][4] !== '') {
        changeYouWon(false)
      }
    }
  }

  const handleAddEmoji = (letter) => {
    const lettersEmoji = Object.keys(animaldleObj)
    const {row, cell} = cellActive
    
    if(lettersEmoji.indexOf(letter.toLowerCase()) !== -1 && arrLetters[row][cell].value === '') {
      addLetter(animaldleObj[letter.toLowerCase()])

      const word = arrLetters[row].reduce((acc, cv) => {
        if(cv.value) {
          acc.push(cv.value)
        }
        return acc
      }, [])

      // Avanza de 1 en 1
      if(cell < 4 && word.length !== 5) {
        changeCell(cell + 1)
      }
      // Si la última letra se ha ingresada, la celda seleccionada cambia a la primera vacía
      if(arrLetters[row][4].value !== '' && word.length !== 5) {
        changeCell(arrLetters[row].findIndex(e => e.value === ""))
      }
      // Si la fila tiene todos los caracteres, se va a la última casilla
      if(word.length === 5) {
        changeCell(4)
      }
    }
  }

  return (
    <div className={styles.keyboard}>
      <div onClick={handleDel} className={styles.del}>
        Del
      </div>
      <div className={styles.row}>
        <div 
          onClick={() => handleAddEmoji('q')} 
          className={styles.key}
        >🐶<div className={styles.letter}>q</div></div>
        <div 
          onClick={() => handleAddEmoji('w')} 
          className={styles.key}
        >🐱<div className={styles.letter}>w</div></div>
        <div 
          onClick={() => handleAddEmoji('e')} 
          className={styles.key}
        >🐭<div className={styles.letter}>e</div></div>
        <div 
          onClick={() => handleAddEmoji('r')} 
          className={styles.key}
        >🐹<div className={styles.letter}>r</div></div>
        <div 
          onClick={() => handleAddEmoji('t')} 
          className={styles.key}
        >🐰<div className={styles.letter}>t</div></div>
      </div>
      <div className={styles.row}>
        <div 
          onClick={() => handleAddEmoji('a')} 
          className={styles.key}
        >🦊<div className={styles.letter}>a</div></div>
        <div 
          onClick={() => handleAddEmoji('s')} 
          className={styles.key}
        >🐻<div className={styles.letter}>s</div></div>
        <div 
          onClick={() => handleAddEmoji('d')} 
          className={styles.key}
        >🐼<div className={styles.letter}>d</div></div>
        <div 
          onClick={() => handleAddEmoji('f')} 
          className={styles.key}
        >🐻‍❄️<div className={styles.letter}>f</div></div>
        <div 
          onClick={() => handleAddEmoji('g')} 
          className={styles.key}
        >🐨<div className={styles.letter}>g</div></div>
      </div>
      <div className={styles.row}>
        <div 
          onClick={() => handleAddEmoji('z')} 
          className={styles.key}
        >🐯<div className={styles.letter}>z</div></div>
        <div 
          onClick={() => handleAddEmoji('x')} 
          className={styles.key}
        >🦁<div className={styles.letter}>x</div></div>
        <div 
          onClick={() => handleAddEmoji('c')} 
          className={styles.key}
        >🐮<div className={styles.letter}>c</div></div>
        <div 
          onClick={() => handleAddEmoji('v')} 
          className={styles.key}
        >🐷<div className={styles.letter}>v</div></div>
        <div 
          onClick={() => handleAddEmoji('b')} 
          className={styles.key}
        >🐸<div className={styles.letter}>b</div></div>
      </div>
      <div onClick={handleEnter} className={styles.enter}>
        Enter
      </div>
    </div>
  )
}

export default KeyBoardEmoji