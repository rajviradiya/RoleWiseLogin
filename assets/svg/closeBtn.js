import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CloseBtn = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M.403 11a10.597 10.597 0 1 1 21.194 0A10.597 10.597 0 0 1 .403 11ZM11 1.923a9.077 9.077 0 1 0 0 18.154 9.077 9.077 0 0 0 0-18.154Zm3.767 5.312a.8.8 0 0 1 0 1.131L12.13 11l2.636 2.634a.801.801 0 0 1-1.133 1.132L11 12.131l-2.633 2.635a.8.8 0 0 1-1.368-.566.8.8 0 0 1 .235-.566L9.869 11 7.234 8.366a.801.801 0 0 1 1.133-1.132L11 9.869l2.634-2.635a.8.8 0 0 1 1.133.001Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CloseBtn

