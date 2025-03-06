import { useStore } from "../store/store"
import styles from './styles/Config.module.css'

const Config = ({ hiddenConfig, setHiddenConfig }) => {

  const wordLength = useStore(state => state.wordLength)
  const setWordLength = useStore(state => state.setWordLength)
  const darkMode = useStore(state => state.darkMode)
  const changeDarkMode = useStore(state => state.changeDarkMode)

  const handleChange = (e) => {
    setWordLength(+e.target.value)
    localStorage.setItem('wordLength', JSON.stringify(+e.target.value))
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
          <h3 className={styles.item__title}>Cantidad de letras</h3>
          <div className={styles.select__container}>
            <select onChange={handleChange} className={styles.select} value={wordLength} name="letterNumber">
              <option className={styles.option} value="2">2 letras</option>
              <option className={styles.option} value="3">3 letras</option>
              <option className={styles.option} value="4">4 letras</option>
              <option className={styles.option} value="5">5 letras</option>
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
        <button onClick={handleCloseConfig} className={styles.close}>Cerrar</button>
      </footer>
    </div>
  )
}

export default Config