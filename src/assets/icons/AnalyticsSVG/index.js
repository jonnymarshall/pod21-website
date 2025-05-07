import React from "react";
import { createIconComponent } from "../../../utils/createIconComponent.jsx";

const svgContent = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_165_1355)">
<path d="M17.1834 6.85L18.6234 8.29L13.7434 13.17L10.4534 9.88C10.0634 9.49 9.43335 9.49 9.04335 9.88L3.04335 15.89C2.65335 16.28 2.65335 16.91 3.04335 17.3C3.43335 17.69 4.06335 17.69 4.45335 17.3L9.74335 12L13.0334 15.29C13.4234 15.68 14.0534 15.68 14.4434 15.29L20.0334 9.71L21.4734 11.15C21.7834 11.46 22.3234 11.24 22.3234 10.8V6.5C22.3334 6.22 22.1134 6 21.8334 6H17.5434C17.0934 6 16.8734 6.54 17.1834 6.85Z" fill="#F3EFEB"/>
</g>
<defs>
<clipPath id="clip0_165_1355">
<rect width="24" height="24" fill="white" transform="translate(0.333374)"/>
</clipPath>
</defs>
</svg>`;

export const AnalyticsSVG = createIconComponent(svgContent, "AnalyticsSVG");
