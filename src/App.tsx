import { CarouselBase } from "./CarouselBase"
import style from "./App.module.scss"
import { useState } from "react"

function App() {
  const [page, setPage] = useState(0)
  const [index, setIndex] = useState(0)

  const onNext = () => {
    setIndex(index + 1)
  }
  const onPrev = () => {
    setIndex(index - 1)
  }
  return (
    <div className={style.frame}>
      <div className={style.container0}>
        <CarouselBase slideTime={500} itemsPerPage={1} index={index}
          rightExposure="20%"
        >
          <div className={style.item0} style={{ background: "red"}}>1</div>
        </CarouselBase>
      </div>
      <div>
        <button onClick={onPrev}>{"<"}</button>
        <button onClick={onNext}>{">"}</button>
      </div>
    </div>
  )
}

export default App
