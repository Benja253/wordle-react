import { create } from 'zustand'
import { animaldleObj, palabrasSeleccionadas } from '../bd/words'

const cellActiveInitial = {row: 0, cell:0}

const arrLetterInitial = []

const opportunitiesAndLetterInitial = [
  { letters: 2, opportunities: 8 }, 
  { letters: 3, opportunities: 7 }, 
  { letters: 4, opportunities: 6 }, 
  { letters: 5, opportunities: 6 }, 
  { letters: 6, opportunities: 6 }, 
  { letters: 7, opportunities: 5 },
  { letters: 8, opportunities: 4 },
  { letters: 9, opportunities: 4 },
  { letters: 'animaldle', opportunities: 6}
]

export const useStore = create((set) => ({
  // Dark o Light mode
  darkMode: true,
  changeDarkMode: (newValue) => set(() => ({darkMode: newValue})),

  // Palabra seleccionada
  wordSelected: '',
  changeWordSelected: (newWord) => set(() => ({wordSelected: newWord})),

  opportunitiesAndLetter: opportunitiesAndLetterInitial,

  // Estado que indique si ganaste o perdiste
  youWon: null,
  changeYouWon: (newValue) => set(() => ({youWon: newValue})),

  // Celda activa
  cellActive: cellActiveInitial,
  changeRow: (newRow) => set(() => ({cellActive: {row: newRow, cell: 0}})),
  changeCell: (newCell) => set(state => ({cellActive: {...state.cellActive, cell: newCell}})),

  // Contenido del wordle
  arrLetters: arrLetterInitial,
  addLetter: (letter) => set(state => {
    state.arrLetters[state.cellActive.row][state.cellActive.cell].value = letter
    return ({arrLetters: [...state.arrLetters]})
  }),
  removeLetter: () => set(state => {
    if(state.arrLetters[state.cellActive.row][state.cellActive.cell].value !== '') {
      state.arrLetters[state.cellActive.row][state.cellActive.cell].value = ''
    } else {
      if(state.cellActive.cell > 0){
        state.arrLetters[state.cellActive.row][state.cellActive.cell - 1].value = ''
        state.changeCell(state.cellActive.cell - 1)
      }
    }
    return {arrLetters: [...state.arrLetters]}
  }),
  changeStatus: (newStatus, cell) => set(state => {
    const wordLengthState = state.wordLength === 'animaldle' ? 5 : state.wordLength
    const index = state.opportunitiesAndLetter.findIndex(e => e.letters === wordLengthState)
    if(state.arrLetters[state.opportunitiesAndLetter[index].opportunities - 2][wordLengthState - 1].status !== 'none') {
      state.arrLetters[state.cellActive.row][cell].status = newStatus
    } else {
      state.arrLetters[state.cellActive.row === 0 ? state.cellActive.row : state.cellActive.row - 1][cell].status = newStatus
    }
    return {arrLetters: [...state.arrLetters]}
  }),
  changeRows: () => set(state => {
    const arrPivot = []
    const index = state.opportunitiesAndLetter.findIndex(e => e.letters === state.wordLength)
    for(let i = 0; i < state.opportunitiesAndLetter[index].opportunities;i++) {
      const arrLettersPivot = []
      const limit = state.wordLength === 'animaldle' ? 5 : state.wordLength

      for(let j = 0;j < limit; j++) {
        arrLettersPivot.push({value: '', status: 'none'})
      }
      arrPivot.push(arrLettersPivot)
    }
    return {arrLetters: [...arrPivot]}
  }),

  // Cantidad de letras de la palabra
  wordLength: 5,
  setWordLength: (newLength) => set(() => ({wordLength: newLength})),

  resetAllStore: () => set(state => {
    if(state.wordLength === 'animaldle') {
      const emojis = Object.values(animaldleObj)
      const arr = []
      for(let i = 0; i < 5; i++) {
        arr.push(emojis[Math.floor(Math.random() * emojis.length)])
      }
      state.changeWordSelected(arr)
    } else {
      state.changeWordSelected(palabrasSeleccionadas[state.wordLength][Math.floor(Math.random() * palabrasSeleccionadas[state.wordLength].length)])
    }

    state.changeRows()

    return {
      youWon: null,
      cellActive: cellActiveInitial
    }
  })
}))