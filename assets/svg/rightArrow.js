import * as React from "react"
import Svg, { Path } from "react-native-svg"
const RightArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m2.043 5.483.884-.883 4.816 4.814a.83.83 0 0 1 0 1.178l-4.816 4.816-.883-.883 4.52-4.52-4.52-4.522Z"
    />
  </Svg>
)
export default RightArrowIcon
