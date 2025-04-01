import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import useKeyDown from './hooks/useKeyDown'
import { animaldleObj, palabrasSeleccionadas } from './bd/words'
import { useStore } from './store/store'
import { Notification, Box, Keyboard, Config, KeyBoardEmoji, ModalResult, Instructions } from './components'

function App() {

  const changeWordSelected = useStore(state => state.changeWordSelected)
  const cellActive = useStore(state => state.cellActive)
  const opportunitiesAndLetter = useStore(state => state.opportunitiesAndLetter)
  const wordLength = useStore(state => state.wordLength)
  const setWordLength = useStore(state => state.setWordLength)
  const arrLetters = useStore(state => state.arrLetters)
  const changeRows = useStore(state => state.changeRows)
  const darkMode = useStore(state => state.darkMode)
  const changeDarkMode = useStore(state => state.changeDarkMode)

  const [hiddenInstruction, setHiddenInstruction] = useState(true)
  const [hiddenConfig, setHiddenConfig] = useState(true)

  const {
    pressArrowRight,
    pressArrowLeft,
    pressLetters,
    pressBackspace,
    pressEnter
  } = useKeyDown()

  const notificationHTML = useRef()

  const index = opportunitiesAndLetter.findIndex(e => e.letters === wordLength)
  useEffect(() => {
    if(opportunitiesAndLetter[index].opportunities) {
      changeRows()
    }
  }, [wordLength])

  useEffect(() => {
    const cbKeyDown = e => {
      pressArrowRight(e)
      pressArrowLeft(e)
      pressLetters(e)
      pressBackspace(e)
      pressEnter(e, notificationHTML, styles)
    }

    window.addEventListener('keydown', cbKeyDown)
    return () => {
      window.removeEventListener('keydown', cbKeyDown)
    }
  }, [cellActive, arrLetters])

  useEffect(() => {
    // Dark Mode
    const isDark = JSON.parse(localStorage.getItem('darkMode'))
    if(isDark == null) {
      localStorage.setItem('darkMode', JSON.stringify(true))
    }
    if(isDark === true) {
      changeDarkMode(true)
      document.body.classList.add('dark')
    }
    if(isDark === false) {
      changeDarkMode(false)
      document.body.classList.remove('dark')
    }

    // wordLength
    const wordLengthIs = JSON.parse(localStorage.getItem('wordLength'))
    if(wordLengthIs == null) {
      localStorage.setItem('wordLength', wordLength)
    } else {
      setWordLength(JSON.parse(localStorage.getItem('wordLength')))
    }
  }, [])

  useEffect(() => {
    if(wordLength === 'animaldle') {
      const emojis = Object.values(animaldleObj)
      const arr = []
      for(let i = 0; i < 5; i++) {
        arr.push(emojis[Math.floor(Math.random() * emojis.length)])
      }
      changeWordSelected(arr)
    } else {
      changeWordSelected(palabrasSeleccionadas[wordLength][Math.floor(Math.random() * palabrasSeleccionadas[wordLength].length)])
    }
  }, [wordLength])

  const handleInstructions = () => {
    setHiddenInstruction(false)
  }

  const handleConfig = () => {
    setHiddenConfig(false)
  }

  useEffect(() => {
    document.body.classList.add('dark')
    if(!darkMode) {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }, [darkMode])

  return (
    <div className={`${styles.app}`}>
      <button onClick={handleInstructions} className={styles.btn__instructions}>?</button>
      <button onClick={handleConfig} className={styles.config}>
        <i className='bx bx-cog'></i>
      </button>
      <Instructions
        hiddenInstruction={hiddenInstruction}
        setHiddenInstruction={setHiddenInstruction}
      />
      <Config 
        hiddenConfig={hiddenConfig}
        setHiddenConfig={setHiddenConfig}
      />
      <Notification
        notificationHTML={notificationHTML} 
        styles={styles}
      />
      <ModalResult
        stylesApp={styles}
      />
      <h1 className={`${styles.title}`}>{wordLength === 'animaldle' ? 'animaldle' : 'wordle'}</h1>
      <Box />
      {
        wordLength === 'animaldle'
          ? <KeyBoardEmoji />
          : (
            <Keyboard
              notificationHTML={notificationHTML}
              stylesApp={styles}
            />
          )
      }
    </div>
  )
}

export default App