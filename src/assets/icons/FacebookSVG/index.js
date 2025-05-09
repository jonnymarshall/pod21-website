import React from "react";
import { createIconComponent } from "../../../utils/createIconComponent.jsx";

const svgContent = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 16.098C32 7.2071 24.8369 0 16.002 0C7.1631 0.00199975 0 7.2071 0 16.1C0 24.133 5.85127 30.7922 13.4983 32V20.7514H9.43882V16.1H13.5023V12.5504C13.5023 8.51694 15.892 6.28921 19.5456 6.28921C21.2973 6.28921 23.1271 6.60318 23.1271 6.60318V10.5627H21.1094C19.1236 10.5627 18.5037 11.8045 18.5037 13.0784V16.098H22.9391L22.2312 20.7494H18.5017V31.998C26.1487 30.7902 32 24.131 32 16.098Z" fill="#BBF298"/>
</svg>`;

export const FacebookSVG = createIconComponent(svgContent, "FacebookSVG");
