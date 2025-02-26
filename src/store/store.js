import { create } from 'zustand'

const cellActiveInitial = {row: 0, cell:0}

const arrLetterInitial = []

export const useStore = create((set) => ({
  // Palabra seleccionada
  wordSelected: '',
  changeWordSelected: (newWord) => set(() => ({wordSelected: newWord})),

  // Cantidad de filas o oportunidades del wordle
  opportunities: 8,
  changeOpportunities: (newValue) => set(() => ({opportunities: newValue})),

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
    console.log(state.cellActive.row)
    if(state.arrLetters[state.opportunities - 2][state.wordLength - 1].status !== 'none') {
      state.arrLetters[state.cellActive.row][cell].status = newStatus
    } else {
      state.arrLetters[state.cellActive.row === 0 ? state.cellActive.row : state.cellActive.row - 1][cell].status = newStatus
    }
    return {arrLetters: [...state.arrLetters]}
  }),
  changeRows: () => set(state => {
    const arrPivot = []
    for(let i = 0; i < state.opportunities;i++) {
      arrPivot.push([{value: '', status: 'none'},{value: '', status: 'none'}])
    }
    return {arrLetters: arrPivot}
  }),

  // Cantidad de letras de la palabra
  wordLength: 2,
  setWordLength: (newLength) => set(state => {wordLength: newLength}),

  resetAllStore: () => set(() => ({
    youWon: null,
    cellActive: cellActiveInitial,
    arrLetters: [
      [{...{value: '', status: 'none'}},{...{value: '', status: 'none'}}],
      [{...{value: '', status: 'none'}},{...{value: '', status: 'none'}}],
      [{...{value: '', status: 'none'}},{...{value: '', status: 'none'}}],
      [{...{value: '', status: 'none'}},{...{value: '', status: 'none'}}],
      [{...{value: '', status: 'none'}},{...{value: '', status: 'none'}}],
      [{...{value: '', status: 'none'}},{...{value: '', status: 'none'}}],
    ],
  }))
}))