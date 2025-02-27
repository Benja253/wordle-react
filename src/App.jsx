import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import useKeyDown from './hooks/useKeyDown'
import { letter2 } from './bd/words'
import { useStore } from './store/store'
import { Notification, Box, Keyboard } from './components'
import ModalResult from './components/ModalResult'
import Instructions from './components/Instructions'

function App() {

  const changeWordSelected = useStore(state => state.changeWordSelected)
  const cellActive = useStore(state => state.cellActive)
  const opportunitiesAndLetter = useStore(state => state.opportunitiesAndLetter)
  const wordLength = useStore(state => state.wordLength)
  const arrLetters = useStore(state => state.arrLetters)
  const changeRows = useStore(state => state.changeRows)

  const [hiddenInstruction, setHiddenInstruction] = useState(true)

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
    changeWordSelected(letter2[Math.floor(Math.random() * letter2.length)])
  }, [])

  const handleInstructions = () => {
    setHiddenInstruction(false)
  }

  return (
    <div className={`${styles.app}`}>
      <button onClick={handleInstructions} className={styles.btn__instructions}>?</button>
      <Instructions
        hiddenInstruction={hiddenInstruction}
        setHiddenInstruction={setHiddenInstruction}
      />
      <Notification
        notificationHTML={notificationHTML} 
        styles={styles}
      />
      <ModalResult
        stylesApp={styles} 
      />
      <h1 className={`${styles.title}`}>Wordle</h1>
      <Box />
      <Keyboard
        notificationHTML={notificationHTML}
        stylesApp={styles}
      />
    </div>
  )
}

export default App