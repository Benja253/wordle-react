import { useEffect, useState } from 'react'
import { letter2 } from '../bd/words'
import { useStore } from '../store/store'
import styles from './styles/ModalResult.module.css'

const ModalResult = ({stylesApp}) => {

  const youWon = useStore(state => state.youWon)
  const wordSelected = useStore(state => state.wordSelected)
  const arrLetters = useStore(state => state.arrLetters)
  // const resetAllStore = useStore(state => state.resetAllStore)
  // const changeWordSelected = useStore(state => state.changeWordSelected)

  const [attempts, setAttempts] = useState()

  useEffect(() => {
    let stats = JSON.parse(localStorage.getItem('stats'))
    if(!stats) {
      localStorage.setItem('stats', JSON.stringify([0,0,0,0,0,0,0]))
      stats = [0,0,0,0,0,0,0]
    }
    if(youWon) {
      stats[arrLetters.findLastIndex(e => e[0].value !== '')] += 1
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    if(youWon === false) {
      stats[stats.length - 1] += 1
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    setAttempts(stats)
  }, [youWon])

  const getStyte = (attempt, arrAttempts) => {
    const maxAttempt = arrAttempts.reduce((acc, cv) => cv > acc ? cv : acc , -Infinity)
    return {
      width: `${attempt/maxAttempt * 100}%`
    }
  }

  const handleClick = () => {
    location.reload()
    // resetAllStore()
    // changeWordSelected(letter2[Math.floor(Math.random() * letter2.length)])
  }

  return (
    <div className={`${styles.modal} ${youWon === null && stylesApp.hiddenModal}`}>
      <article className={styles.modal__int}>
        <h2 className={`${styles.title}`}>{youWon ? 'Ganaste 🎉': 'Perdiste 😵'}</h2>
        <section className={styles.selected}>
          <p className={styles.selected__p}>La palabra seleccionada es:</p>
          <h3 className={`${styles.selected__word} ${styles[youWon]}`}>{wordSelected}</h3>
        </section>
        <div className={styles.attempts}>
          {
            attempts?.map((attempt, index, arrAttempts) => (
              <section className={styles.attempt} key={index}>
                <h4 className={styles.attempt__title}>{index !== 6 ? `Intento ${index + 1}` : 'Errores ❌'}</h4>
                <div className={styles.bar}>
                  <div className={styles.bar__int} style={getStyte(attempt, arrAttempts)}>
                  </div>
                </div>
                <div className={styles.attempt__value}>{attempt}</div>
              </section>
            ))
          }
        </div>
        <footer className={styles.footer}>
          <button onClick={handleClick} className={`${styles.btn} ${styles[youWon]}`}>Jugar otra palabra</button>
        </footer>
      </article>
    </div>
  )
}

export default ModalResult