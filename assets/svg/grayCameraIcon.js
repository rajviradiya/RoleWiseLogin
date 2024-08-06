import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GrayCameraIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      stroke="#8F969A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.104 1.167H8.896L6.292 4.292H3.167a2.083 2.083 0 0 0-2.084 2.083v9.375a2.083 2.083 0 0 0 2.084 2.083h16.666a2.083 2.083 0 0 0 2.084-2.083V6.375a2.083 2.083 0 0 0-2.084-2.083h-3.125l-2.604-3.125Z"
    />
    <Path
      stroke="#8F969A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.5 13.667a3.125 3.125 0 1 0 0-6.25 3.125 3.125 0 0 0 0 6.25Z"
    />
  </Svg>
)
export default GrayCameraIcon
