import { Carousel } from "./Carousel"
import style from "./App.module.scss"

function App() {
  return (
    <div className={style.container0}>
      <Carousel slideTime={1000} itemsPerPage={2}>
        <div className={style.item0}>1</div>
        <div className={style.item0}>2</div>
        <div className={style.item0}>3</div>
      </Carousel>
    </div>
  )
}

export default App
