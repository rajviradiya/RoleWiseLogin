import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DropDownIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M6.707 8.293a1 1 0 0 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0-1.414-1.414L12 13.586 6.707 8.293Z"
    />
  </Svg>
)
export default DropDownIcon

