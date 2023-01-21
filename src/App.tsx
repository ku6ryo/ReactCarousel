import { CarouselBase } from "./CarouselBase"
import style from "./App.module.scss"
import { useState } from "react"

function App() {
  const [index, setIndex] = useState(0)

  const onNext = () => {
    setIndex(index + 2)
  }
  const onPrev = () => {
    setIndex(index - 2)
  }
  return (
    <div className={style.frame}>
      <div className={style.container0}>
        <CarouselBase
          slideTime={500}
          itemsPerPage={2}
          index={index}
          rightExposure="10%"
          leftExposure="10%"
        >
          <div className={style.item0} style={{ background: "red"}}>1</div>
          <div className={style.item0} style={{ background: "blue"}}>2</div>
          <div className={style.item0} style={{ background: "yellow"}}>3</div>
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
