import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SearchIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M9.583 17.5a7.917 7.917 0 1 0 0-15.834 7.917 7.917 0 0 0 0 15.834ZM18.333 18.333l-1.666-1.666"
    />
  </Svg>
)
export default SearchIcon
