import { MouseEventHandler } from "react"

export default function Square({value, onSquareClick}: {value: string, onSquareClick: MouseEventHandler}) {
  
    return (
      <button 
        className="square"
        onClick={onSquareClick}>{value}
      </button>
    )
}