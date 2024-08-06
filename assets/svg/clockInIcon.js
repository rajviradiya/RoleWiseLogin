import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ClockInIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#4BD659"
      d="M9.167 5.833 8 7l2.167 2.167h-8.5v1.666h8.5L8 13l1.167 1.167L13.333 10 9.167 5.833Zm7.5 10H10V17.5h6.667c.916 0 1.666-.75 1.666-1.667V4.167c0-.917-.75-1.667-1.666-1.667H10v1.667h6.667v11.666Z"
    />
  </Svg>
)
export default ClockInIcon
