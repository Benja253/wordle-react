import { useStore } from '../store/store'
import styles from './styles/Instructions.module.css'

const Instructions = ({hiddenInstruction, setHiddenInstruction}) => {

  const opportunitiesAndLetter = useStore(state => state.opportunitiesAndLetter)
  const wordLength = useStore(state => state.wordLength)
  const opportunities = opportunitiesAndLetter[opportunitiesAndLetter.findIndex(e => e.letters === wordLength)].opportunities

  const handleCerrar = () => {
    setHiddenInstruction(true)
  }

  return (
    <div className={`${styles.instructions__container} ${hiddenInstruction && styles.hidden}`}>
      <article className={styles.instructions}>
        <header className={styles.header}>
          <h2 className={styles.title}>Instrucciones</h2>
          <button onClick={handleCerrar} className={styles.x}>x</button>
        </header>
        <p className={styles.subtitle}>Debes adivinar una palabra de {wordLength} letras, tienes {opportunities} intentos para hacerlo.</p>
        <ol className={styles.list}>
          <li className={styles.list__item}>
            <p className={styles.item__p}>Ingresa una palabra de exista y presiona <span className={`${styles.key} ${styles.enter} ${styles.enter}`}>enter</span> para obtener mas pistas</p>
            <div className={styles.key__container}>
              <div className={`${styles.letter}`}>
                <div className={`${styles.front} ${styles.perfect}`}>x</div>
              </div>
              <div className={`${styles.letter}`}>
                <div className={`${styles.front} ${styles.imperfect}`}>l</div>
              </div>
            </div>
          </li>
          <li className={styles.list__item}>
            <p className={styles.item__p}>Se pueden dar la siguientes posibilidades:</p>
            <ol className={styles.sublist}>
              <li className={styles.key__container}>
                <div className={`${styles.letter}`}>
                  <div className={`${styles.front} ${styles.no}`}>a</div>
                </div>
                <p className={styles.item__p}>La letra no está en la palabra</p>
              </li>
              <li className={styles.key__container}>
                <div className={`${styles.letter}`}>
                  <div className={`${styles.front} ${styles.imperfect}`}>l</div>
                </div>
                <p className={styles.item__p}>La letra está en la palabra pero no esa posición</p>
              </li>
              <li className={styles.key__container}>
                <div className={`${styles.letter}`}>
                  <div className={`${styles.front} ${styles.perfect}`}>x</div>
                </div>
                <p className={styles.item__p}>La letra está en la palabra y además en la misma posición</p>
              </li>
            </ol>
          </li>
          <li className={styles.list__item}>
            <p className={styles.item__p}>Cuando las la coincidencias son verdes. <span className={styles.win}>Ganaste ✨</span></p>
            <div className={styles.key__container}>
              <div className={`${styles.letter}`}>
                <div className={`${styles.front} ${styles.perfect}`}>x</div>
              </div>
              <div className={`${styles.letter}`}>
                <div className={`${styles.front} ${styles.perfect}`}>s</div>
              </div>
            </div>
          </li>
        </ol>
        <footer className={styles.footer}>
          <button onClick={handleCerrar} className={styles.cerrar}>Cerrar Instrucciones</button>
        </footer>
      </article>
    </div>
  )
}

export default Instructions