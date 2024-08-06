import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AddIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#4BD659"
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2Z"
    />
  </Svg>
)
export default AddIcon
