import { useEffect } from 'react'
import styles from './App.module.css'
import Box from './components/Box'
import useKeyDown from './hooks/useKeyDown'
import { useStore } from './store/store'

function App() {

  const cellActive = useStore(state => state.cellActive)
  console.log(cellActive)

  const {
    pressArrowRight,
    pressArrowLeft,
    pressLetters,
    pressBackspace,
    pressEnter
  } = useKeyDown()

  useEffect(() => {
    const cbKeyDown = e => {
      pressArrowRight(e)
      pressArrowLeft(e)
      pressLetters(e)
      pressBackspace(e)
      pressEnter(e)
    }

    window.addEventListener('keydown', cbKeyDown)
    return () => {
      window.removeEventListener('keydown', cbKeyDown)
    }
  })

  return (
    <div>
      <h1 className={`${styles.title}`}>Wordle</h1>
      <Box />
    </div>
  )
}

export default App