import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const AttendanceIcon = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M19.667 4h-1V2h-2v2h-8V2h-2v2h-1c-1.11 0-1.99.9-1.99 2l-.01 14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16h-14V10h14v10Zm-10-6h-2v-2h2v2Zm4 0h-2v-2h2v2Zm4 0h-2v-2h2v2Zm-8 4h-2v-2h2v2Zm4 0h-2v-2h2v2Zm4 0h-2v-2h2v2Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.667 0h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default AttendanceIcon

