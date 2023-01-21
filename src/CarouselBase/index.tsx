import { MouseEventHandler, ReactElement, useEffect, useMemo, useRef, useState, } from "react"
import style from "./style.module.scss"
import classnemas from "classnames"

type Props = {
  children?: ReactElement[] | ReactElement
  itemsPerPage: number
  slideTime: number
  index: number
  leftExposure?: string
  rightExposure?: string
}

function extractPageItems(mainIndex: number, items: ReactElement[]) {
  const startIndex = mainIndex - items.length
  const numToExtract = items.length * 3
  let extracted: ReactElement[] = []
  for (let i = startIndex; i < startIndex + numToExtract; i++) {
    let index = i % items.length
    if (index < 0) {
      index += items.length
    }
    extracted.push(items[index])
  }
  return extracted
}

export function CarouselBase({
  children,
  itemsPerPage,
  slideTime,
  index,
  leftExposure,
  rightExposure,
}: Props) {

  const leftEx = useMemo(() => leftExposure || "0", [leftExposure])
  const rightEx = useMemo(() => rightExposure || "0", [rightExposure])

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [sliding, setSliding] = useState(false)
  const [prevPage, setPrevPage] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)

  const numChildren = useMemo(() => {
    if (!children) return 0
    return Array.isArray(children) ? children.length : 1
  }, [children])
  
  const extractChildren = () => {
    if (!children) {
      return []
    }
    if (Array.isArray(children)) {
      return extractPageItems(prevIndex, children)
    } else {
      return extractPageItems(prevIndex, [children])
    }
  }

  const items = useMemo(() => {
    return extractChildren()
  }, [extractChildren, prevPage])

  const widthPerItem = 100 / items.length

  useEffect(() => {
    if (sliderRef.current) {
      setSliding(true)
      const diffIndex = index - prevIndex
      sliderRef.current.style.transition = `${slideTime / 1000}s`
      sliderRef.current.style.transform = `translateX(${diffIndex * -widthPerItem}%)`
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none"
        }
        setPrevIndex(index)
        setSliding(false)
      }, slideTime)
    } else {
      setPrevPage(index)
    }
  }, [index])
  
  if (!sliding && sliderRef.current) {
    sliderRef.current.style.transform = "none"
  }

  return (
    <div className={style.frame}>
      <div className={style.sliderPadding} style={{
        padding: `0 ${rightEx} 0 ${leftEx}`,
      }}>
        <div
          className={style.slider}
          style={{
            left: `calc(${-100 * numChildren / itemsPerPage}%`,
            gridTemplateColumns: Array(items.length).fill(null).map(() => "1fr").join(" "),
            transition: `${slideTime}s`,
            width: `${items.length / itemsPerPage * 100}%`
          }}
          ref={sliderRef}
        >
          {items.map(item => {
            return (
              <div className={style.item}>
                <div className={style.buffer}>{item}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}