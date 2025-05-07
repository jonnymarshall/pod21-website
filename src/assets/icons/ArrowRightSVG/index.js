import React from "react";
import { createIconComponent } from "../../../utils/createIconComponent.jsx";

const svgContent = `<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.7175 0.282485C9.425 0.574985 9.425 1.04749 9.7175 1.33999L12.6275 4.24999H1.25C0.8375 4.24999 0.5 4.58749 0.5 4.99999C0.5 5.41249 0.8375 5.74999 1.25 5.74999H12.635L9.725 8.65998C9.4325 8.95248 9.4325 9.42499 9.725 9.71749C10.0175 10.01 10.49 10.01 10.7825 9.71749L14.975 5.52499C15.2675 5.23249 15.2675 4.75999 14.975 4.46749L10.775 0.282485C10.49 -0.0100146 10.01 -0.0100146 9.7175 0.282485Z" fill="#212121"/>
</svg>`;

export const ArrowRightSVG = createIconComponent(svgContent, "ArrowRightSVG");
