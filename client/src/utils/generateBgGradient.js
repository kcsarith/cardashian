import hexToRgb from './hexToRgb';

export default (direction, color, opacity) => {
    // Regex to check if hex code
    const hexRegex = RegExp(/^#(?:[0-9a-f]{3}){1,2}$/i);

    // Regex to check if rgb color
    const rgbRegex = RegExp(/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/);

    // Regex to check if rgba color
    const rgbaRegex = RegExp(
        /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/
    );

    // Check if the color is a hex code
    const isHex = hexRegex.test(color);

    // Check if the color is a rgb color
    const isRgb = rgbRegex.test(color);

    // Check if the color is a rgba color
    const isRgba = rgbaRegex.test(color);

    // Create a variable to store our rgb value array
    let rgbValues;

    // Convert hex code to array of rgb values
    if (isHex) rgbValues = hexToRgb(color);

    // Pull out our RGB values into an array
    if (isRgb || isRgba) rgbValues = color.replace(/[^\d,]/g, '').split(',');

    // Create our rgba value
    const rgba = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]
        }, ${opacity})`;

    return `linear-gradient(${direction}, ${rgba}, ${rgba})`;
};
