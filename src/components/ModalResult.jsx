import { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import styles from './styles/ModalResult.module.css'

const ModalResult = ({stylesApp}) => {

  const youWon = useStore(state => state.youWon)
  const wordSelected = useStore(state => state.wordSelected)
  const wordLength = useStore(state => state.wordLength)
  const arrLetters = useStore(state => state.arrLetters)
  const opportunitiesAndLetter = useStore(state => state.opportunitiesAndLetter)
  const resetAllStore = useStore(state => state.resetAllStore)

  const [attempts, setAttempts] = useState()

  useEffect(() => {
    let stats = JSON.parse(localStorage.getItem('stats'))
    const arr = []
    const index = opportunitiesAndLetter.findIndex(e => e.letters == wordLength)
    for(let i = 0;i <= opportunitiesAndLetter[index].opportunities; i++) {
      arr.push(0)
    }
    if(!stats) {
      stats = {[wordLength]: arr}
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    if(stats && !stats[wordLength]) {
      stats = {...stats, [wordLength]: arr}
    }
    if(stats?.hasOwnProperty[wordLength] && stats?.[wordLength].length !== (wordLength + 1)) {
      const arr = []
      for(let i = 0;i <= wordLength; i++) {
        arr.push(0)
      }
      stats = {...stats, [wordLength]: arr}
    }
    if(youWon) {
      stats[wordLength][arrLetters.findLastIndex(e => e[0].value !== '')] += 1
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    if(youWon === false) {
      stats[wordLength][stats[wordLength].length - 1] += 1
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    setAttempts(stats[wordLength])
  }, [youWon])

  const getStyte = (attempt, arrAttempts) => {
    const maxAttempt = arrAttempts.reduce((acc, cv) => cv > acc ? cv : acc , -Infinity)
    return {
      width: `${attempt/maxAttempt * 100}%`
    }
  }

  const handleClick = () => {
    // location.reload()
    resetAllStore()
    // changeWordSelected(letter2[Math.floor(Math.random() * letter2.length)])
  }

  return (
    <div className={`${styles.modal} ${youWon === null && stylesApp.hiddenModal}`}>
      <article className={styles.modal__int}>
        <h2 className={`${styles.title}`}>{youWon ? 'Ganaste 🎉': 'Perdiste 😵'}</h2>
        <section className={styles.selected}>
          <p className={styles.selected__p}>La {wordLength === 'animaldle' ? 'secuencia' : 'palabra'} seleccionada es:</p>
          <h3 className={`${styles.selected__word} ${styles[youWon]}`}>{youWon !== null && wordSelected}</h3>
        </section>
        <div className={styles.attempts}>
          {
            attempts?.map((attempt, index, arrAttempts) => (
              <section className={styles.attempt} key={index}>
                <h4 className={styles.attempt__title}>{index !== arrAttempts.length - 1 ? `Intento ${index + 1}` : 'Errores ❌'}</h4>
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
          <div onClick={handleClick} className={`${styles.btn} ${styles[youWon]}`}>Jugar otra palabra</div>
        </footer>
      </article>
    </div>
  )
}

export default ModalResult