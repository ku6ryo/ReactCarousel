import { MouseEventHandler, ReactElement, useCallback, useEffect, useRef, useState, } from "react"
import style from "./style.module.scss"
import { CarouselBase, SlideState } from "../CarouselBase"

type Props = {
  children?: ReactElement[] | ReactElement
  interval: number
}

export function AutoPagingCarousel({
  children,
  interval,
}: Props) {

  const stateRef = useRef(SlideState.Stopped)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stateRef.current === SlideState.Stopped) {
        setIndex((v) => v + 1)
      }
    }, interval)
    return () => clearInterval(intervalId)
  }, [interval])

  const onArrowClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (stateRef.current === SlideState.Sliding) {
      return
    }
    const direction = Number(e.currentTarget.dataset.direction)
    setIndex((v) => v + direction)
  }

  const onStateChange = useCallback((s: SlideState) => {
    stateRef.current = s
  }, [])

  return (
    <div className={style.frame}>
      <CarouselBase
        slideTime={500}
        itemsPerPage={2}
        index={index}
        rightExposure="50px"
        leftExposure="50px"
        onStateChange={onStateChange}
      >
        {children}
      </CarouselBase>
      <div>
        <button onClick={onArrowClick} data-direction="-1">{"<"}</button>
        <button onClick={onArrowClick} data-direction="1">{">"}</button>
      </div>
    </div>
  )
}