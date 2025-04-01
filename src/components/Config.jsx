import { useStore } from "../store/store"
import styles from './styles/Config.module.css'

const Config = ({ hiddenConfig, setHiddenConfig }) => {

  const wordLength = useStore(state => state.wordLength)
  const setWordLength = useStore(state => state.setWordLength)
  const darkMode = useStore(state => state.darkMode)
  const changeDarkMode = useStore(state => state.changeDarkMode)
  const resetAllStore = useStore(state => state.resetAllStore)

  const handleChange = (e) => {
    const value = e.target.value === 'animaldle' ? e.target.value : +e.target.value
    setWordLength(value)
    resetAllStore()
    localStorage.setItem('wordLength', JSON.stringify(value))
  }

  const handleClick = () => {
    if(!darkMode) {
      changeDarkMode(true)
      localStorage.setItem('darkMode', JSON.parse(true))
    } else {
      changeDarkMode(false)
      localStorage.setItem('darkMode', JSON.parse(false))
    }
  }

  const handleCloseConfig = () => {
    setHiddenConfig(true)
  }

  return (
    <div className={`${styles.config} ${hiddenConfig && styles.hidden}`}>
      <h2 className={styles.title}>Configuración</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <h3 className={styles.item__title}>Tipo Wordle</h3>
          <div className={styles.select__container}>
            <select onChange={handleChange} className={styles.select} value={wordLength} name="letterNumber">
              <option className={styles.option} value="2">2️⃣ letras</option>
              <option className={styles.option} value="3">3️⃣ letras</option>
              <option className={styles.option} value="4">4️⃣ letras</option>
              <option className={styles.option} value="5">5️⃣ letras</option>
              <option className={styles.option} value="animaldle">🦁 animaldle</option>
            </select>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.item__title}>Modo oscuro</h3>
          <div onClick={handleClick} className={`${styles.toggle} ${darkMode && styles.dark}`}>
            <div className={`${styles.toggle__btn}`}></div>
          </div>
        </li>
      </ul>
      <footer className={styles.footer}>
        <div onClick={handleCloseConfig} className={styles.close}>Cerrar</div>
      </footer>
    </div>
  )
}

export default Config