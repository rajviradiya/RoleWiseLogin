import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PlayBtn = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M8 5v14l11-7L8 5Z" />
  </Svg>
)
export default PlayBtn

