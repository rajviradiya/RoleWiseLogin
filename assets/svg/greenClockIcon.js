import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GreenClockIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#4BD659"
      d="M10 1.667c-4.583 0-8.333 3.75-8.333 8.333s3.75 8.333 8.333 8.333 8.333-3.75 8.333-8.333S14.583 1.667 10 1.667Zm2.958 11.5-3.4-2.092a.822.822 0 0 1-.4-.708V6.458a.642.642 0 0 1 .634-.625.63.63 0 0 1 .625.625v3.709l3.2 1.925c.3.183.4.575.216.875a.64.64 0 0 1-.875.2Z"
    />
  </Svg>
)
export default GreenClockIcon
