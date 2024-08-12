import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CloseImgIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillOpacity={0.48}
      d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14-6.268 14-14 14S0 21.732 0 14Z"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m13.996 15.056 4.24 4.241a.75.75 0 0 0 1.06-1.06l-4.24-4.24 4.24-4.242a.75.75 0 0 0-1.06-1.06l-4.24 4.241-4.24-4.24a.75.75 0 0 0-1.06 1.06l4.24 4.24-4.24 4.241a.75.75 0 1 0 1.06 1.06l4.24-4.24Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CloseImgIcon

