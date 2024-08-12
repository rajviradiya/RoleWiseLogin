import * as React from "react"
import Svg, { Path } from "react-native-svg";
const GroupTabIcon = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M7.333 8.75c-2.34 0-7 1.17-7 3.5V13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.75c0-2.33-4.66-3.5-7-3.5ZM2.673 12c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25h-9.32Zm4.66-5c1.93 0 3.5-1.57 3.5-3.5S9.263 0 7.333 0s-3.5 1.57-3.5 3.5S5.403 7 7.333 7Zm0-5c.83 0 1.5.67 1.5 1.5S8.163 5 7.333 5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5Zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.75c0-2.02-3.5-3.17-5.96-3.44ZM13.333 7c1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35Z"
    />
  </Svg>
)
export default GroupTabIcon
