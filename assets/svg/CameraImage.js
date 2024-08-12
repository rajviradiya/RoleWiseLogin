import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CameraImage = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={39}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="black"
      d="M5.5 5.167v-5h3.333v5h5V8.5h-5v5H5.5v-5h-5V5.167h5Zm5 10v-5h5v-5h11.667l3.05 3.333H35.5c1.833 0 3.333 1.5 3.333 3.333v20c0 1.834-1.5 3.334-3.333 3.334H8.833A3.343 3.343 0 0 1 5.5 31.833V15.167h5Zm11.667 15c4.6 0 8.333-3.734 8.333-8.334S26.767 13.5 22.167 13.5a8.336 8.336 0 0 0-8.334 8.333c0 4.6 3.734 8.334 8.334 8.334Zm-5.334-8.334a5.328 5.328 0 0 0 5.334 5.334 5.328 5.328 0 0 0 5.333-5.334 5.328 5.328 0 0 0-5.333-5.333 5.328 5.328 0 0 0-5.334 5.333Z"
    />
  </Svg>
)
export default CameraImage
