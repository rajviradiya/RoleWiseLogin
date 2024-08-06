import * as React from "react"
import Svg, { Path } from "react-native-svg";
const MessageIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M17.325 2.333c0-.916-.742-1.666-1.658-1.666H2.333c-.916 0-1.666.75-1.666 1.666v10c0 .917.75 1.667 1.666 1.667H14l3.333 3.333-.008-15Zm-4.158 5.834H9.833V11.5H8.167V8.167H4.833V6.5h3.334V3.167h1.666V6.5h3.334v1.667Z"
    />
  </Svg>
)
export default MessageIcon

