import React from "react";
import Svg, { Path } from "react-native-svg";

const HomeTabIcon = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M11.607.463a1 1 0 0 0-1.214 0l-9.6 7.332a.998.998 0 1 0 1.212 1.586L3 8.62V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8.62l1 .76a.996.996 0 0 0 1.207-1.585l-9.6-7.332ZM7 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"
    />
  </Svg>
);

export default HomeTabIcon;

