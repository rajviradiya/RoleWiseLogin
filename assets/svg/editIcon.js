import * as React from "react"
import Svg, { Path } from "react-native-svg"
const EditIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#4BD659"
      d="M5 19h1.425L16.2 9.225 14.775 7.8 5 17.575V19Zm-2 2v-4.25L16.2 3.575c.2-.183.421-.325.663-.425.242-.1.496-.15.762-.15s.524.05.775.15c.25.1.467.25.65.45L20.425 5c.2.183.346.4.438.65a2.141 2.141 0 0 1 0 1.513 1.85 1.85 0 0 1-.438.662L7.25 21H3ZM15.475 8.525l-.7-.725L16.2 9.225l-.725-.7Z"
    />
  </Svg>
)
export default EditIcon
