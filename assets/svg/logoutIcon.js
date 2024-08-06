import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LogoutIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M12.5 3c-4.963 0-9 4.037-9 9s4.037 9 9 9a8.993 8.993 0 0 0 7.36-3.82l-1.219-.867A7.49 7.49 0 0 1 12.5 19.5 7.488 7.488 0 0 1 5 12c0-4.151 3.349-7.5 7.5-7.5a7.493 7.493 0 0 1 6.141 3.188l1.219-.867A8.99 8.99 0 0 0 12.5 3Zm5.508 5.46L16.93 9.54l1.711 1.71H9.5v1.5h9.141l-1.711 1.71 1.078 1.08 3-3 .515-.54-.516-.54-2.999-3Z"
    />
  </Svg>
)
export default LogoutIcon

