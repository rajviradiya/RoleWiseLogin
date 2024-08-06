import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const CalendarIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M10 20H3a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V0h2v2h8V0h2v2h1c1.1 0 2 .9 2 2v6h-2V8H3v10h7v2Zm10.13-5.01.71-.71a.996.996 0 0 0 0-1.41l-.71-.71a.996.996 0 0 0-1.41 0l-.71.71 2.12 2.12Zm-.71.71-5.3 5.3H12v-2.12l5.3-5.3 2.12 2.12Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CalendarIcon
