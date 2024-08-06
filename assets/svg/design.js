import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const DesignIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G fill="#4BD659" clipPath="url(#a)">
      <Path d="M12 6.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Zm0-1.5A.375.375 0 1 1 12 6a.375.375 0 0 1 0-.75ZM9 19.5H4.5a.375.375 0 0 0-.375.375v2.25a.375.375 0 0 0 .375.375H9a.375.375 0 0 0 .375-.375v-2.25A.375.375 0 0 0 9 19.5Zm-.375 2.25h-3.75v-1.5h3.75v1.5Zm4.5-5.25h-2.25a.375.375 0 0 0-.375.375v1.5a.375.375 0 0 0 .375.375h2.25a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375ZM12.75 18h-1.5v-.75h1.5V18Z" />
      <Path d="M22.125 6.75H21a.375.375 0 0 0-.375.375V9h-5.78l-.558-2.089a2.617 2.617 0 0 0-1.162-3.654V1.125a1.125 1.125 0 1 0-2.25 0v2.132A2.617 2.617 0 0 0 9.713 6.91L9.155 9h-5.78V7.125A.375.375 0 0 0 3 6.75H1.875a1.5 1.5 0 0 0-1.5 1.5V22.5a1.5 1.5 0 0 0 1.5 1.5h20.25a1.5 1.5 0 0 0 1.5-1.5V8.25a1.5 1.5 0 0 0-1.5-1.5Zm-3 3h1.5v.75h-1.5v-.75Zm-3.87 3.677a4.72 4.72 0 0 1-.06 2.67l-2.16-8.06c.24-.105.465-.245.665-.416l1.555 5.806ZM12 12.375a.375.375 0 0 0-.375.375v.375h-1.246l.904-3.375h1.434l.904 3.375h-1.246v-.375a.375.375 0 0 0-.375-.375ZM11.484 9l.206-.77c.206.027.414.027.62 0l.206.77h-1.032Zm.141-7.875a.375.375 0 1 1 .75 0V3.03a2.359 2.359 0 0 0-.75 0V1.125ZM12 3.75a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75Zm-1.7 3.872c.2.17.424.31.665.415l-2.16 8.062a4.72 4.72 0 0 1-.06-2.67L10.3 7.62ZM3.375 9.75h1.5v.75h-1.5v-.75Zm0 3.75h1.5V18h-1.5v-4.5Zm-2.25-5.25a.75.75 0 0 1 .75-.75h.75V21h-.75c-.263 0-.522.07-.75.201V8.25Zm16.5 15h-6.75v-1.5H13.5a.375.375 0 0 0 .375-.375V20.25h3.75v3Zm4.5 0h-3.75v-3.375A.375.375 0 0 0 18 19.5h-4.5a.375.375 0 0 0-.375.375V21H10.5a.375.375 0 0 0-.375.375v1.875h-8.25a.75.75 0 1 1 0-1.5H3a.375.375 0 0 0 .375-.375V18.75H5.25a.375.375 0 0 0 .375-.375v-5.25a.375.375 0 0 0-.375-.375H3.375v-1.5H5.25a.375.375 0 0 0 .375-.375V9.75h3.329l-.905 3.375h-.924a.375.375 0 1 0 0 .75h.768c-.17 1.163.04 2.35.6 3.383l-.157.586a.375.375 0 0 0 .725.194l1.117-4.163h1.447v.375a.375.375 0 0 0 .75 0v-.375h1.447l1.116 4.163a.375.375 0 0 0 .724-.194l-.157-.586c.56-1.033.771-2.22.602-3.383h.768a.375.375 0 0 0 0-.75h-.924l-.905-3.375h3.329v1.125a.375.375 0 0 0 .375.375h1.875v1.5H18.75a.375.375 0 0 0-.375.375v5.25a.375.375 0 0 0 .375.375h1.875v2.625a.375.375 0 0 0 .375.375h1.125a.75.75 0 1 1 0 1.5Zm-1.5-9.75V18h-1.5v-4.5h1.5Zm2.25 7.701a1.489 1.489 0 0 0-.75-.201h-.75V7.5h.75a.75.75 0 0 1 .75.75v12.951Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default DesignIcon;
