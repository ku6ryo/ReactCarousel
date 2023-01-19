import { MouseEventHandler, ReactElement, useMemo, useRef, useState, } from "react"
import style from "./style.module.scss"
import classnemas from "classnames"

type Props = {
  children?: ReactElement[] | ReactElement
  itemsPerPage: number
  slideTime: number
}

function extractPageItems(page: number, itemsPerPage: number, items: ReactElement[]) {
  const startIndex = itemsPerPage * page
  let extracted: ReactElement[] = []
  for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
    const arrayIndex = (() => {
      let index = i % items.length
      if (index < 0) {
        index += items.length
      }
      return index
    })()
    extracted.push(items[arrayIndex])
  }
  return extracted
}

export function Carousel({ children, itemsPerPage, slideTime, }: Props) {
  const [page, setPage] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [sliding, setSliding] = useState(false)

  const slide = (direction: -1 | 1) => {
    if (sliding) {
      return
    }
    if (sliderRef.current) {
      setSliding(true)
      sliderRef.current.style.transition = `${slideTime / 1000}s`
      sliderRef.current.style.transform = `translateX(${direction * -33.33333}%)`
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none"
          sliderRef.current.style.transform = "none"
          setPage(page + direction)
          setSliding(false)
        }
      }, slideTime)
    } else {
      setPage(page + direction)
    }
  }
  const onPagerLeftClick: MouseEventHandler = () => {
    slide(1)
  }

  const onPagerRightClick: MouseEventHandler = () => {
    slide(-1)
  }
  
  const extractChildren = (page: number) => {
    if (!children) {
      return []
    }
    if (Array.isArray(children)) {
      return extractPageItems(page, itemsPerPage, children)
    } else {
      return extractPageItems(page, itemsPerPage, [children])
    }
  }

  const items = useMemo(() => {
    return extractChildren(page - 1).concat(extractChildren(page)).concat(extractChildren(page + 1))
  }, [extractChildren, page])

  return (
    <div className={style.frame}>
      <div className={classnemas(style.pager)} onClick={onPagerLeftClick}>{"<"}</div>
      <div
        className={style.slider}
        style={{
          gridTemplateColumns: Array(items.length).fill(null).map(() => "1fr").join(" "),
          left: "-100%",
          transition: `${slideTime}s`,
        }}
        ref={sliderRef}
      >
        {items.map(item => {
          return (
            <div className={style.item}>{item}</div>
          )
        })}
      </div>
      <div className={classnemas(style.pager)} onClick={onPagerRightClick}>{">"}</div>
    </div>
  )
}