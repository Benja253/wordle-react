import { useStore } from "../store/store"
import { compareWord } from "../utils/compareWord"
import { wordExist } from "../utils/wordExist"


const useKeyDown = () => {

  const wordLength = useStore(state => state.wordLength)

  const opportunities = useStore(state => state.opportunities)
  
  const wordSelected = useStore(state => state.wordSelected)

  const cellActive = useStore(state => state.cellActive)
  const {row, cell} = cellActive
  const changeCell = useStore(state => state.changeCell)
  const changeRow = useStore(state => state.changeRow)

  const arrLetters = useStore(state => state.arrLetters)
  const addLetter = useStore(state => state.addLetter)
  const removeLetter = useStore(state => state.removeLetter)
  const changeStatus = useStore(state => state.changeStatus)

  const changeYouWon = useStore(state => state.changeYouWon)
  
  // Mover a la derecha
  const pressArrowRight = e => {
    if(e.key === "ArrowRight" && cellActive.cell < wordLength - 1) {
      changeCell(cellActive.cell + 1)
    }
  }
  
  // Mover a la izquierda
  const pressArrowLeft = e => {
    if(e.key === "ArrowLeft" && cell > 0) {
      changeCell(cell - 1)
    }
  }

  // Ingreso de letras
  const pressLetters = e => {
    if(/[a-zA-ZñÑ]/.test(e.key) && e.key.length === 1 && arrLetters[row][cell].value === '') {

      addLetter(e.key.toUpperCase())

      const word = arrLetters[row].reduce((acc, cv) => acc + cv.value.toLowerCase(), '')

      // Avanza de 1 en 1
      if(cell < wordLength - 1 && word.length !== wordLength) {
        changeCell(cell + 1)
      }
      // Si la última letra se ha ingresada, la celda seleccionada cambia a la primera vacía
      if(arrLetters[row][wordLength - 1].value !== '' && word.length !== wordLength) {
        changeCell(arrLetters[row].findIndex(e => e.value === ""))
      }
      // Si la fila tiene todos los caracteres, se va a la última casilla
      if(word.length === wordLength) {
        changeCell(wordLength - 1)
      }
    }
  }

  // Backspace
  const pressBackspace = e => {
    if(e.key === 'Backspace') {
      removeLetter()
    }
  }

  // Enter
  const pressEnter = (e, notificationHTML, styles) => {
    const word = arrLetters[row].reduce((acc, cv) => acc + cv.value.toLowerCase(), '')
    if(e.key === "Enter" && word.length === wordLength) {
      if(wordExist(word)) {
        const arrStatus = compareWord(word, wordSelected, changeYouWon)
        for(let i = 0; i < word.length; i++) {
          setTimeout(() => {
            changeStatus(arrStatus[i].status, i)
          }, 200 * i)
        }
        if(row + 1 < opportunities) {
          changeRow(row + 1)
        }
        if(row + 1 === opportunities && !arrStatus.every(e => e.status === 'perfect') && arrLetters[row][wordLength - 1] !== '') {
          changeYouWon(false)
        }
      } else {
        notificationHTML.current.classList.remove(styles.hidden)
        setTimeout(() => {
          notificationHTML.current.classList.add(styles.hidden)
        }, 3000)
      }
    }
  }

  return {
    pressArrowRight,
    pressArrowLeft,
    pressLetters,
    pressBackspace,
    pressEnter
  }
}

export default useKeyDown