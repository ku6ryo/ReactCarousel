import { CarouselBase } from "./CarouselBase"
import style from "./App.module.scss"
import { useState, } from "react"
import { AutoPagingCarousel } from "./AutoPagingCarousel"
import { CustomizedButtonCarousel } from "./CutomizedButtonCarousel"

function App() {
  const [index, setIndex] = useState(0)

  return (
    <div className={style.frame}>
      <h1>Pure base</h1>
      <CarouselBase
        slideTime={500}
        itemsPerPage={2}
        index={index}
        rightExposure="10%"
        leftExposure="10%"
      >
        <div className={style.item0} style={{ background: "red", height: "100px"}} />
        <div className={style.item0} style={{ background: "blue", height: "100px"}} />
        <div className={style.item0} style={{ background: "yellow", height: "100px"}} />
      </CarouselBase>
      <div>
        <button onClick={() => setIndex((v) => v - 1)}>{"<"}</button>
        <button onClick={() => setIndex((v) => v + 1)}>{">"}</button>
      </div>
      <h1>Customized Button</h1>
      <CustomizedButtonCarousel>
        <div className={style.item2} style={{ background: "red"}}></div>
        <div className={style.item2} style={{ background: "blue"}}></div>
        <div className={style.item2} style={{ background: "yellow"}}></div>
        <div className={style.item2} style={{ background: "limegreen"}}></div>
      </CustomizedButtonCarousel>
      <h1>Auto paging</h1>
      <AutoPagingCarousel interval={2000}>
        <div className={style.item2} style={{ background: "red"}}></div>
        <div className={style.item2} style={{ background: "blue"}}></div>
        <div className={style.item2} style={{ background: "yellow"}}></div>
        <div className={style.item2} style={{ background: "limegreen"}}></div>
      </AutoPagingCarousel>
    </div>
  )
}

export default App
