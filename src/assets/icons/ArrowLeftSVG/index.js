import React from "react";
import { createIconComponent } from "../../../utils/createIconComponent.jsx";

const svgContent = `<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.27504 9.72498C6.56754 9.43248 6.56754 8.95998 6.27504 8.66748L3.37254 5.74999H14.75C15.1625 5.74999 15.5 5.41249 15.5 4.99999C15.5 4.58749 15.1625 4.24999 14.75 4.24999H3.37254L6.28254 1.33999C6.57504 1.04749 6.57504 0.574985 6.28254 0.282485C5.99004 -0.0100146 5.51754 -0.0100146 5.22504 0.282485L1.02504 4.47499C0.732539 4.76749 0.732539 5.23999 1.02504 5.53249L5.21754 9.72498C5.51004 10.01 5.99004 10.01 6.27504 9.72498Z" fill="#F3EFEB"/>
</svg>
`;

export const ArrowLeftSVG = createIconComponent(svgContent, "ArrowLeftSVG");
