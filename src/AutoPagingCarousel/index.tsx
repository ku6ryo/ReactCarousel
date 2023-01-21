import { ReactElement, useEffect, useState, } from "react"
import style from "./style.module.scss"
import { CarouselBase } from "../CarouselBase"

type Props = {
  children?: ReactElement[] | ReactElement
  interval: number
}

export function AutoPagingCarousel({
  children,
  interval,
}: Props) {

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((v) => v + 1)
    }, interval)
    return () => clearInterval(intervalId)
  }, [interval])

  return (
    <div className={style.frame}>
      <CarouselBase
        slideTime={500}
        itemsPerPage={2}
        index={index}
        rightExposure="50px"
        leftExposure="50px"
      >
        {children}
      </CarouselBase>
    </div>
  )
}