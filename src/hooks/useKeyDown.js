import { useStore } from "../store/store"
import { compareWord } from "../utils/compareWord"

const useKeyDown = () => {

  const wordLength = useStore(state => state.wordLength)

  const wordSelected = useStore(state => state.wordSelected)

  const cellActive = useStore(state => state.cellActive)
  const {row, cell} = cellActive
  const changeCell = useStore(state => state.changeCell)
  const changeRow = useStore(state => state.changeRow)

  const arrLetters = useStore(state => state.arrLetters)
  const addLetter = useStore(state => state.addLetter)
  const removeLetter = useStore(state => state.removeLetter)
  const changeStatus = useStore(state => state.changeStatus)
  
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
      if(cell < wordLength - 1) {
        changeCell(cell + 1)
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
  const pressEnter = e => {
    const word = arrLetters[row].reduce((acc, cv) => acc + cv.value.toLowerCase(), '')
    if(e.key === "Enter" && word.length === wordLength) {
      if(row + 1 < 6) {
        changeRow(row + 1)
      }
      const arrStatus = compareWord(word, wordSelected)
      for(let i = 0; i < word.length; i++) {
        changeStatus(arrStatus[i].status, i)
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