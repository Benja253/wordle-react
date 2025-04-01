import { todasLasPalabras } from "../bd/words"

export const wordExist = (word, wordLength) => {
  return todasLasPalabras[wordLength].includes(word.join('').toLowerCase())
}