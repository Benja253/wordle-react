import { useEffect, useState } from "react"
import { useStore } from "../store/store"

const Cell = ({styles, isRowActive, cellNumber, rowNumber, cell}) => {

  const cellActive = useStore(state => state.cellActive)
  const changeCell = useStore(state => state.changeCell)
  
  const [isCellActive, setIsCellActive] = useState(cellNumber === cellActive.cell)

  useEffect(() => {
    setIsCellActive(cellNumber === cellActive.cell)
  }, [cellActive])
  
  const handleClick = () => {
    if(isRowActive) {
      changeCell(cellNumber)
    }
  }

  return (
    <div onClick={handleClick} className={`${styles.letter} ${isRowActive && isCellActive && styles.active}`}>
      <div className={`${cell.status === 'none' ? styles.front : `${styles.back} ${styles[cell.status]}`}`}>
        {cell.value}
      </div>
      <div className={`${cell.status === 'none' ? styles.back : `${styles.front} ${styles[cell.status]}`}`}>{cell.value}</div>
    </div>
  )
}

export default Cell