import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LeftArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="black"
      d="M19 11H7.83l4.88-4.88a1.008 1.008 0 0 0-.323-1.636.996.996 0 0 0-1.087.216l-6.59 6.59a.997.997 0 0 0 0 1.41l6.59 6.59a.997.997 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1Z"
    />
  </Svg>
)
export default LeftArrow
