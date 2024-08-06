import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PauseIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M6.047 13.771a2.229 2.229 0 0 1-4.458 0V2.23a2.229 2.229 0 1 1 4.458 0V13.77Zm8.363 0a2.229 2.229 0 0 1-4.457 0V2.23a2.229 2.229 0 0 1 4.457 0V13.77Z"
    />
  </Svg>
)
export default PauseIcon

