import { ReactElement, useEffect, useMemo, useRef, useState, } from "react"
import style from "./style.module.scss"
import { v4 as uuid } from "uuid"

function extractPageItems(mainIndex: number, items: ReactElement[]) {
  const startIndex = mainIndex - items.length - 1
  const numToExtract = items.length * 3 + 2
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

export enum SlideState {
  Stopped = "stopped",
  Sliding = "sliding"
}

type Props = {
  children?: ReactElement[] | ReactElement
  itemsPerPage: number
  // how much it takes to slide to the next page.
  slideTime: number
  // Item index.
  index: number
  // How much the next item is exposed.
  leftExposure?: string
  // How much the previous item is exposed.
  rightExposure?: string
  // Fires on sliding is complete
  onStateChange?: (status: SlideState) => void
}

/**
 * Base component to make a carousel.
 */
export function CarouselBase({
  children,
  itemsPerPage,
  slideTime,
  index,
  leftExposure,
  rightExposure,
  onStateChange,
}: Props) {

  const leftEx = useMemo(() => leftExposure || "0", [leftExposure])
  const rightEx = useMemo(() => rightExposure || "0", [rightExposure])

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [sliding, setSliding] = useState(false)
  const [prevIndex, setPrevIndex] = useState(0)

  const numChildren = useMemo(() => {
    if (!children) return 0
    return Array.isArray(children) ? children.length : 1
  }, [children])

  const itemsWithIds = useMemo(() => {
    if (!children) {
      return []
    }
    const items = extractPageItems(prevIndex, Array.isArray(children) ? children : [children])
    return items.map(item => {
      return { item, id: uuid() }
    })
  }, [children, prevIndex])

  const widthPerItem = 100 / itemsWithIds.length

  useEffect(() => {
    if (sliderRef.current) {
      onStateChange?.(SlideState.Sliding)
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
        onStateChange?.(SlideState.Stopped)
      }, slideTime)
    } else {
      setPrevIndex(index)
      onStateChange?.(SlideState.Stopped)
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
            left: `calc(${-100 / itemsPerPage * (numChildren + 1)}%`,
            gridTemplateColumns: Array(itemsWithIds.length).fill(null).map(() => "1fr").join(" "),
            transition: `${slideTime}s`,
            width: `${itemsWithIds.length / itemsPerPage * 100}%`
          }}
          ref={sliderRef}
        >
          {itemsWithIds.map((item) => {
            return (
              <div key={item.id} className={style.item}>
                <div className={style.buffer}>{item.item}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}