import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const PickImageIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={103}
    height={103}
    fill="none"
    {...props}
  >
    <Rect
      width={102}
      height={102}
      x={0.5}
      y={0.5}
      fill="#242B31"
      fillOpacity={0.42}
      rx={7.5}
    />
    <Rect
      width={102}
      height={102}
      x={0.5}
      y={0.5}
      stroke="#fff"
      strokeDasharray="2 2"
      rx={7.5}
    />
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="#fff"
          d="M36.5 38.167v-5h3.333v5h5V41.5h-5v5H36.5v-5h-5v-3.333h5Zm5 10v-5h5v-5h11.667l3.05 3.333H66.5c1.833 0 3.333 1.5 3.333 3.333v20c0 1.834-1.5 3.334-3.333 3.334H39.833a3.343 3.343 0 0 1-3.333-3.334V48.167h5Zm11.667 15c4.6 0 8.333-3.734 8.333-8.334S57.767 46.5 53.167 46.5a8.336 8.336 0 0 0-8.334 8.333c0 4.6 3.734 8.334 8.334 8.334Zm-5.334-8.334a5.328 5.328 0 0 0 5.334 5.334 5.328 5.328 0 0 0 5.333-5.334 5.328 5.328 0 0 0-5.333-5.333 5.328 5.328 0 0 0-5.334 5.333Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M31.5 31.5h40v40h-40z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M31.5 31.5h40v40h-40z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PickImageIcon

