import { createIconComponent } from "../../../utils/createIconComponent";

const svgContent = `<svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99997 2V10.55C5.05997 10.01 3.89997 9.8 2.66997 10.23C1.32997 10.71 0.29997 11.9 0.0599698 13.3C-0.40003 16.04 1.91997 18.38 4.64997 17.95C6.60997 17.64 7.99997 15.84 7.99997 13.85V4H9.99997C11.1 4 12 3.1 12 2C12 0.9 11.1 0 9.99997 0H7.99997C6.89997 0 5.99997 0.9 5.99997 2Z" fill="#F3EFEB"/>
</svg>`;

export const MusicSVG = createIconComponent(svgContent, "MusicSVG");
