
import React from 'react';

/**
 * Creates a standardized icon component from SVG content
 * 
 * @param {string} svgContent - The raw SVG content
 * @param {string} iconName - The name of the icon
 * @returns {React.FC} A React component that renders the icon
 */
export const createIconComponent = (svgContent, iconName) => {
  // Extract viewBox from the SVG content
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  
  // Clean SVG content by removing the outer <svg> tag
  // and preserving the inner content
  const cleanSvgContent = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '');

  const IconComponent = ({ width, height, color, ...props }) => (
    <svg
      width={width || "1em"}
      height={height || "1em"}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g 
        dangerouslySetInnerHTML={{ 
          __html: cleanSvgContent.replace(/fill="[^"]*"/g, `fill="${color || 'currentColor'}"`) 
        }} 
      />
    </svg>
  );

  IconComponent.displayName = iconName;
  
  return IconComponent;
};
