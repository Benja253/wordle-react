import { useEffect, useState } from "react"
import Cell from "./Cell"
import { useStore } from "../store/store"

const Row = ({styles, row, rowNumber}) => {

  const cellActive = useStore(state => state.cellActive)

  const [isRowActive, setIsRowActive] = useState(rowNumber === cellActive.row)

  useEffect(() => {
    setIsRowActive(rowNumber === cellActive.row)
  }, [cellActive])

  return (
    <div className={styles.row}>
      {
        row.map((cell, cellNumber) => (
          <Cell
            key={cellNumber}
            styles={styles}
            isRowActive={isRowActive}
            cellNumber={cellNumber}
            rowNumber={rowNumber}
            cell={cell}
          />
        ))
      }
    </div>
  )
}

export default Row