import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CustomerEmailIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M20 8H4c-1.1 0-1.99.9-1.99 2L2 22c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2Zm0 14H4V12l8 5 8-5v10Zm-8-7-8-5h16l-8 5Z"
    />
  </Svg>
)
export default CustomerEmailIcon

