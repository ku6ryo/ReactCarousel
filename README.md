![screenshot](./screenshot.gif)

# Overview
A carousel UI implementation for React which is fully customizable.

# Motivation 
Most of carousel UI libarries are usually difficult to customize the UI elements. The libraries generates arrows and pagers by itself and we cannot replace it with our own although many libraries provides some ways to customize style by CSS. In many cases, applying CSS style to the default UI components is not enough for our needs for customization. Then, I created a very basic carousel component that provides wide range customizability.

# How to use
Please check files in `src/CarouselBase` and examples in `App.tsx`. You can copy the files of `CarouselBase` component to your project. I do not have time to make a npm module to share this widely.

```typescript
function YourComponent () {
  const [index, setIndex] = useState(0)
  return (
    <>
      <CarouselBase
        slideTime={500}
        itemsPerPage={2}
        index={index}
        rightExposure="10%"
        leftExposure="10%"
      >
        {/* You need to set the height of items by CSS. */}
        <div style={{ background: "red", height: "100px" }} />
        <div style={{ background: "blue", height: "100px" }} />
        <div style={{ background: "yellow", height: "100px" }} />
      </CarouselBase>
      {/* You can use your components as arrows */}
      <div>
        <button onClick={() => setIndex((v) => v - 2)}>{"<"}</button>
        <button onClick={() => setIndex((v) => v + 2)}>{">"}</button>
      </div>
    </>
  )
}
```

# Limitation
The width of each item in a carousel must be the same.