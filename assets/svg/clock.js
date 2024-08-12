import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ClockIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M9.992 1.667c-4.6 0-8.325 3.733-8.325 8.333s3.724 8.333 8.325 8.333c4.608 0 8.341-3.733 8.341-8.333S14.6 1.667 9.992 1.667Zm.008 15A6.665 6.665 0 0 1 3.333 10 6.665 6.665 0 0 1 10 3.333 6.665 6.665 0 0 1 16.666 10 6.665 6.665 0 0 1 10 16.667Zm.416-10.834h-1.25v5l4.375 2.625.625-1.025-3.75-2.225V5.833Z"
    />
  </Svg>
)
export default ClockIcon
