import { useStore } from '../store/store'
import { compareWord, wordExist } from '../utils'
import style from './styles/Keyboard.module.css'

const Keyboard = ({ notificationHTML, stylesApp }) => {

  const arrLetters = useStore(state => state.arrLetters)
  const addLetter = useStore(state => state.addLetter)
  const removeLetter = useStore(state => state.removeLetter)
  const wordLength = useStore(state => state.wordLength)
  const changeRow = useStore(state => state.changeRow)
  const changeCell = useStore(state => state.changeCell)
  const changeYouWon = useStore(state => state.changeYouWon)
  const changeStatus = useStore(state => state.changeStatus)
  const cellActive = useStore(state => state.cellActive)
  const wordSelected = useStore(state => state.wordSelected)
  const {row, cell} = cellActive
  
  const handleBackspace = () => {
    removeLetter()
  }

  const handleEnter = () => {
    const word = arrLetters[row].reduce((acc, cv) => acc + cv.value.toLowerCase(), '')
    if(word.length === wordLength) {
      if(wordExist(word)) {
        const arrStatus = compareWord(word, wordSelected, changeYouWon)
        for(let i = 0; i < word.length; i++) {
          setTimeout(() => {
            changeStatus(arrStatus[i].status, i)
          }, 200 * i)
        }
        if(row + 1 < 6) {
          changeRow(row + 1)
        }
        if(row + 1 === 6 && !arrStatus.every(e => e.status === 'perfect') && arrLetters[row][wordLength - 1] !== '') {
          changeYouWon(false)
        }
      } else {
        notificationHTML.current.classList.remove(stylesApp.hidden)
        setTimeout(() => {
          notificationHTML.current.classList.add(stylesApp.hidden)
        }, 3000)
      }
    }
  }

  let arrLetterWithoutRow = []
  arrLetters.forEach(e => {
    arrLetterWithoutRow.push(...e)
  })

  const getKeySyle = (key) => {
    const findPerfect = arrLetterWithoutRow.findIndex(e => key.toUpperCase() === e.value && e.status === 'perfect')
    const findImperfect = arrLetterWithoutRow.findIndex(e => key.toUpperCase() === e.value && e.status === 'imperfect')
    const findNo = arrLetterWithoutRow.findIndex(e => key.toUpperCase() === e.value && e.status === 'no')
    if(findPerfect !== -1) {
      return arrLetterWithoutRow[findPerfect].status
    } else if(findImperfect !== -1) {
      return arrLetterWithoutRow[findImperfect].status
    } else if(findNo !== -1){
      return arrLetterWithoutRow[findNo].status
    } else {
      return ''
    }
  }

  const handleAddLetter = (e) => {
    // Agregar letra
    if(arrLetters[row][cell].value === '') {
      addLetter(e.target.textContent.toUpperCase())
      changeCell(cell < wordLength - 1 ? cell + 1 : cell)
    }
    const word = arrLetters[row].reduce((acc, cv) => acc + cv.value.toLowerCase(), '')

    if(arrLetters[row][wordLength - 1].value !== '' && word.length !== wordLength) {
      changeCell(arrLetters[row].findIndex(e => e.value === ""))
    }

    if(word.length === wordLength) {
      changeCell(wordLength - 1)
    }
  }

  return (
    <div className={style.keyboard__container}>
      <div className={style.keyboard}>
        <div className={style.row}>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('q')]}`}>q</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('w')]}`}>w</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('e')]}`}>e</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('r')]}`}>r</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('t')]}`}>t</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('y')]}`}>y</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('u')]}`}>u</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('i')]}`}>i</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('o')]}`}>o</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('p')]}`}>p</div>
        </div>
        <div className={style.row}>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('a')]}`}>a</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('s')]}`}>s</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('d')]}`}>d</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('f')]}`}>f</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('g')]}`}>g</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('h')]}`}>h</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('j')]}`}>j</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('k')]}`}>k</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('l')]}`}>l</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('ñ')]}`}>ñ</div>
        </div>
        <div className={style.row}>
          <div onClick={handleBackspace} className={`${style.key}`}>del</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('z')]}`}>z</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('x')]}`}>x</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('c')]}`}>c</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('v')]}`}>v</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('b')]}`}>b</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('n')]}`}>n</div>
          <div onClick={handleAddLetter} className={`${style.key} ${style[getKeySyle('m')]}`}>m</div>
          <div onClick={handleEnter} className={`${style.key}`}>enter</div>
        </div>
      </div>
    </div>
  )
}

export default Keyboard