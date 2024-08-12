import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M17.773 1.289 3.89 15.167c.3.147.63.224.963.225h2.378a.746.746 0 0 1 .53.22L9.049 16.9a3.728 3.728 0 0 0 3.845.901 3.698 3.698 0 0 0 2.508-2.99l2.533-12.03a2.218 2.218 0 0 0-.162-1.492ZM15.239.059l-12 2.527a3.748 3.748 0 0 0-2.142 6.362l1.288 1.288a.75.75 0 0 1 .22.53v2.378c.001.334.078.663.225.964L16.71.225a2.197 2.197 0 0 0-1.47-.167Z"
    />
  </Svg>
)
export default SvgComponent
