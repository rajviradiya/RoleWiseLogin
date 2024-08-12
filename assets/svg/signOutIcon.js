import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SignOutIcon = (props) => (
     <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          fill="none"
          viewBox="0 0 24 24"
          {...props}
     >
          <Path
               stroke="#4BD659"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeMiterlimit={10}
               strokeWidth={1.5}
               d="M17.44 14.62 20 12.06 17.44 9.5M9.76 12.06h10.17M11.76 20c-4.42 0-8-3-8-8s3.58-8 8-8"
          />
     </Svg>
)
export default SignOutIcon