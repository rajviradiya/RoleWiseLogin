import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FileLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="blue"
      d="M11.333.333h-8A2.663 2.663 0 0 0 .68 3L.667 19c0 1.467 1.2 2.667 2.666 2.667h21.334c1.466 0 2.666-1.2 2.666-2.667V5.667C27.333 4.2 26.133 3 24.667 3H14L11.333.333Z"
    />
  </Svg>
);

export default FileLogo;


