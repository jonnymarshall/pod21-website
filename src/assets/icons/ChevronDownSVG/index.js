import React from "react";
import { createIconComponent } from "../../../utils/createIconComponent.jsx";

const svgContent = `<svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.532493 1.7825L2.47499 3.725C2.76749 4.0175 3.23999 4.0175 3.53249 3.725L5.47499 1.7825C5.94749 1.31 5.60999 0.5 4.94249 0.5H1.05749C0.389993 0.5 0.0599928 1.31 0.532493 1.7825Z" fill="#BBF298"/>
</svg>`;

export const ChevronDownSVG = createIconComponent(svgContent, "ChevronDownSVG");
