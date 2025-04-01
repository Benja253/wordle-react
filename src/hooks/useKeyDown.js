import { animaldleObj } from "../bd/words"
import { useStore } from "../store/store"
import { compareWord } from "../utils/compareWord"
import { wordExist } from "../utils/wordExist"


const useKeyDown = () => {

  const wordLength = useStore(state => state.wordLength)

  const opportunitiesAndLetter = useStore(state => state.opportunitiesAndLetter)
  
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
    const wordLengthWithEmoji = wordLength === 'animaldle' ? 5 : wordLength
    if(e.key === "ArrowRight" && cellActive.cell < wordLengthWithEmoji - 1) {
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
    if(/[a-zA-ZñÑ]/.test(e.key) && e.key.length === 1 && arrLetters[row][cell].value === '' && wordLength !== 'animaldle') {

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

    if(/[a-zA-ZñÑ]/.test(e.key) && e.key.length === 1 && arrLetters[row][cell].value === '' && wordLength === 'animaldle') {
      const lettersEmoji = Object.keys(animaldleObj)

      if(lettersEmoji.indexOf(e.key.toLowerCase()) !== -1) {
        addLetter(animaldleObj[e.key.toLowerCase()])

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
  }

  // Backspace
  const pressBackspace = e => {
    if(e.key === 'Backspace') {
      removeLetter()
    }
  }

  // Enter
  const pressEnter = (e, notificationHTML, styles) => {
    const word = arrLetters[row].reduce((acc, cv) => {
      if(cv.value) {
        acc.push(cv.value)
      }
      return acc
    }, [])
    const wordLengthWithEmoji = wordLength === 'animaldle' ? 5 : wordLength
    if(e.key === "Enter" && word.length === wordLengthWithEmoji) {
      if(wordLength !== 'animaldle') {
        if(wordExist(word, wordLength)) {
          const arrStatus = compareWord(word.join(''), wordSelected, changeYouWon)
          for(let i = 0; i < word.length; i++) {
            setTimeout(() => {
              changeStatus(arrStatus[i].status, i)
            }, 200 * i)
          }
          let index = opportunitiesAndLetter.findIndex(e => e.letters === wordLength)
          if(row + 1 < opportunitiesAndLetter[index].opportunities) {
            changeRow(row + 1)
          }
          if(row + 1 === opportunitiesAndLetter[index].opportunities && !arrStatus.every(e => e.status === 'perfect') && arrLetters[row][wordLength - 1] !== '') {
            changeYouWon(false)
          }
        } else {
          notificationHTML.current.classList.remove(styles.hidden)
          setTimeout(() => {
            notificationHTML.current.classList.add(styles.hidden)
          }, 3000)
        }
      }
      if(wordLength === 'animaldle') {
        const arrStatus = compareWord(word, wordSelected, changeYouWon)
        for(let i = 0; i < word.length; i++) {
          setTimeout(() => {
            changeStatus(arrStatus[i].status, i)
          }, 200 * i)
        }
        let index = opportunitiesAndLetter.findIndex(e => e.letters === wordLength)
        if(row + 1 < opportunitiesAndLetter[index].opportunities) {
          changeRow(row + 1)
        }
        if(row + 1 === opportunitiesAndLetter[index].opportunities && !arrStatus.every(e => e.status === 'perfect') && arrLetters[row][wordLength - 1] !== '') {
          changeYouWon(false)
        }
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