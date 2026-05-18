"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePixels = generatePixels;
function generatePixels(width, height) {
    const data = [];
    let counter = 0;
    while (counter < width * height) {
        data.push({
            r: getRandomRGBAElement(),
            g: getRandomRGBAElement(),
            b: getRandomRGBAElement(),
            a: getRandomRGBAElement()
        });
        counter++;
    }
    return { data, width, height };
}
function getRandomRGBAElement() {
    return Math.floor(Math.random() * 253);
}
