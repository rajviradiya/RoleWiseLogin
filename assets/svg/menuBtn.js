import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MenuButton = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M14 12.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Zm-1.75 9.188a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Zm0-14.875a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z"
    />
  </Svg>
)
export default MenuButton
