import * as React from "react"
import Svg, { Path } from "react-native-svg";
const ThreadTabIcon = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M15.38 2.571v8H4.148l-.675.675-.662.663V2.57h12.57ZM16.525.286H1.667C1.038.286.524.8.524 1.429v16l4.571-4.572h11.429c.628 0 1.143-.514 1.143-1.143V1.43c0-.629-.515-1.143-1.143-1.143Zm5.714 4.571h-2.286v10.286H5.095v2.286c0 .628.515 1.143 1.143 1.143H18.81l4.57 4.57V6c0-.629-.513-1.143-1.142-1.143Z"
    />
  </Svg>
)
export default ThreadTabIcon
