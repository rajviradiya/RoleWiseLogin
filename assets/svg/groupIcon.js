import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const GroupIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M12.5 10a3.332 3.332 0 1 0 0-6.667 3.332 3.332 0 1 0 0 6.667ZM5 8.333v-2.5H3.333v2.5h-2.5V10h2.5v2.5H5V10h2.5V8.333H5Zm7.5 3.334c-2.225 0-6.667 1.116-6.667 3.333v1.667h13.334V15c0-2.217-4.442-3.333-6.667-3.333Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default GroupIcon

