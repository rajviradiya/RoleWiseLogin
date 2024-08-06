import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PlanIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#4BD659"
      d="M24 2.383a1.214 1.214 0 0 0-.36-.868L22.485.36A1.214 1.214 0 0 0 21.62 0h-.004a1.202 1.202 0 0 0-.857.36L15.52 5.6H5.2V1.2A1.2 1.2 0 0 0 4 0h-.8A3.204 3.204 0 0 0 0 3.2v17.7A3.287 3.287 0 0 0 3.316 24H22.8a1.2 1.2 0 0 0 1.2-1.2v-16a1.2 1.2 0 0 0-1.2-1.2h-1.52l2.36-2.36a1.206 1.206 0 0 0 .36-.857ZM14.312 10a.267.267 0 0 1-.229-.08.276.276 0 0 1-.08-.226l.152-1.36a.721.721 0 0 1 .024-.084l1.575 1.576c-.026.006-.05.018-.076.022L14.312 10Zm2.095-.653-1.75-1.751 4.36-4.36 1.75 1.75-4.36 4.36Zm3.174-6.677.593-.593 1.75 1.75-.594.593-1.749-1.75ZM.801 3.2A2.402 2.402 0 0 1 3.2.8H4c.22 0 .4.18.4.4v16a.4.4 0 0 1-.4.4h-.8a3.194 3.194 0 0 0-2.4 1.085V3.2ZM22.8 6.4c.22 0 .4.179.4.4v16a.4.4 0 0 1-.4.4H3.316A2.48 2.48 0 0 1 .8 20.888V20.8a2.402 2.402 0 0 1 2.4-2.4H4a1.2 1.2 0 0 0 1.2-1.2V6.4h9.52l-.909.908c-.253.25-.413.58-.451.934l-.152 1.363c-.012.133 0 .267.037.395H6.4a.4.4 0 0 0 0 .8h1.2v10.8a.4.4 0 0 0 .8 0V16h4.4v3.2H10a.4.4 0 0 0 0 .8h8a.8.8 0 0 0 .8-.8v-6a.4.4 0 0 0-.8 0v2H8.4v-4.4h5.883c.04 0 .078-.002.117-.007l1.367-.155c.347-.04.67-.194.92-.438l3.795-3.8H22.8ZM18 16v3.2h-4.4V16H18Zm5.076-13.327-.587.587-1.75-1.748.588-.588a.41.41 0 0 1 .59.002l1.158 1.154a.42.42 0 0 1 .092.46.41.41 0 0 1-.091.133Z"
    />
  </Svg>
)
export default PlanIcon;
