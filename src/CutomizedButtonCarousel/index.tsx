import { MouseEventHandler, ReactElement, useCallback, useRef, useState, } from "react"
import style from "./style.module.scss"
import { CarouselBase, SlideState } from "../CarouselBase"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

type Props = {
  children?: ReactElement[] | ReactElement
}

export function CustomizedButtonCarousel({
  children,
}: Props) {

  const stateRef = useRef(SlideState.Stopped)
  const [index, setIndex] = useState(0)

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
          itemsPerPage={1}
          index={index}
          rightExposure="50px"
          leftExposure="50px"
          onStateChange={onStateChange}
        >
          {children}
        </CarouselBase>
        <div className={[style.arrow, style.left].join(" ")} >
          <button
            data-direction="-1"
            onClick={onArrowClick}
          >
            <BiLeftArrow/>
          </button>
        </div>
        <div className={[style.arrow, style.right].join(" ")} >
          <button
            data-direction="1"
            onClick={onArrowClick}
          >
            <BiRightArrow/>
          </button>
        </div>
      </div>
  )
}