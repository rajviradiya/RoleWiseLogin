import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GrayTickIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <Path
            fill="#E0E0E0"
            d="M.205 6.705 3 9.5l.705-.71L.915 6M11.12 2.79 5.83 8.085 3.75 6l-.715.705L5.83 9.5l6-6M9 3.5l-.705-.71L5.12 5.965l.71.705L9 3.5Z"
        />
    </Svg>
)
export default GrayTickIcon
