import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GreenLocationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#4BD659"
      d="M10 10c-.917 0-1.667-.75-1.667-1.667 0-.916.75-1.666 1.667-1.666s1.667.75 1.667 1.666C11.667 9.25 10.917 10 10 10Zm5-1.5c0-3.025-2.208-5.167-5-5.167S5 5.475 5 8.5c0 1.95 1.625 4.533 5 7.617 3.375-3.084 5-5.667 5-7.617Zm-5-6.833c3.5 0 6.667 2.683 6.667 6.833 0 2.767-2.225 6.042-6.667 9.833-4.442-3.791-6.667-7.066-6.667-9.833C3.333 4.35 6.5 1.667 10 1.667Z"
    />
  </Svg>
)
export default GreenLocationIcon;
