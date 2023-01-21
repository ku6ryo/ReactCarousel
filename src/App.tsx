import { CarouselBase } from "./CarouselBase"
import style from "./App.module.scss"
import { useState } from "react"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

function App() {
  const [index0, setIndex0] = useState(0)
  const [index1, setIndex1] = useState(0)

  return (
    <div className={style.frame}>
      <h1>Basic</h1>
      <div className={style.container0}>
        <CarouselBase
          slideTime={500}
          itemsPerPage={2}
          index={index0}
          rightExposure="10%"
          leftExposure="10%"
        >
          <div className={style.item0} style={{ background: "red"}}></div>
          <div className={style.item0} style={{ background: "blue"}}></div>
          <div className={style.item0} style={{ background: "yellow"}}></div>
        </CarouselBase>
      </div>
      <div>
        <button onClick={() => setIndex0((v) => v - 2)}>{"<"}</button>
        <button onClick={() => setIndex0((v) => v + 2)}>{">"}</button>
      </div>
      <h1>Customized</h1>
      <div className={style.container1}>
        <CarouselBase
          slideTime={500}
          itemsPerPage={1}
          index={index1}
          rightExposure="50px"
          leftExposure="50px"
        >
          <div className={style.item1} style={{ background: "red"}}></div>
          <div className={style.item1} style={{ background: "blue"}}></div>
          <div className={style.item1} style={{ background: "yellow"}}></div>
        </CarouselBase>
        <div
          className={[style.arrow, style.left].join(" ")}
        >
          <button
            onClick={() => setIndex1((v) => v - 2)}
          >
            <BiLeftArrow/>
          </button>
        </div>
        <div
          className={[style.arrow, style.right].join(" ")}
        >
          <button
            onClick={() => setIndex1((v) => v + 2)}
          >
            <BiRightArrow/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
