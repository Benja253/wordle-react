import { useEffect, useRef } from 'react'
import styles from './App.module.css'
import useKeyDown from './hooks/useKeyDown'
import { letter2 } from './bd/words'
import { useStore } from './store/store'
import { Notification, Box } from './components'
import ModalResult from './components/ModalResult'

function App() {

  const changeWordSelected = useStore(state => state.changeWordSelected)
  const cellActive = useStore(state => state.cellActive)

  const {
    pressArrowRight,
    pressArrowLeft,
    pressLetters,
    pressBackspace,
    pressEnter
  } = useKeyDown()

  const notificationHTML = useRef()

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
  }, [cellActive])

  useEffect(() => {
    changeWordSelected(letter2[Math.floor(Math.random() * letter2.length)])
  }, [])

  return (
    <div className={`${styles.app}`}>
      <Notification 
        notificationHTML={notificationHTML} 
        styles={styles}
      />
      <ModalResult
        stylesApp={styles} 
      />
      <h1 className={`${styles.title}`}>Wordle</h1>
      <Box />
    </div>
  )
}

export default App