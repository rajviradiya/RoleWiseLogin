import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m14.27 3.73-4.24 10.13-1.32-3.42-.32-.83-.82-.32-3.43-1.33 10.13-4.23ZM18 0 0 7.53v.98l6.84 2.65L9.48 18h.98L18 0Z"
    />
  </Svg>
)
export default SvgComponent
