import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SendMessageIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M9.166 8.192v3.475h1.667V8.192l1.325 1.316 1.175-1.175L10 5 6.667 8.333l1.175 1.175 1.324-1.316Z"
    />
    <Path
      fill="#000"
      d="M15.833 2.5H4.167C3.25 2.5 2.5 3.25 2.5 4.167v11.666c0 .917.75 1.667 1.667 1.667h11.666c.917 0 1.667-.75 1.667-1.667V4.167c0-.917-.75-1.667-1.667-1.667Zm0 13.333H4.167v-2.5h2.516A4.142 4.142 0 0 0 10 15c1.358 0 2.55-.658 3.317-1.667h2.516v2.5Zm0-4.166H12.35A2.492 2.492 0 0 1 10 13.333c-1.092 0-2-.7-2.35-1.666H4.167v-7.5h11.666v7.5Z"
    />
  </Svg>
)
export default SendMessageIcon
