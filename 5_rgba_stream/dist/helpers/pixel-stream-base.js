"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelStreamBase = void 0;
class PixelStreamBase {
    constructor() {
        this.rgbaSize = 4;
    }
    validateCoordinates(x, y) {
        if (y > this.height || y < 1) {
            throw new Error('There is no ' + y + '\'th row');
        }
        if (x > this.width || x < 1) {
            throw new Error('There is no ' + x + '\'th column');
        }
    }
    throwValidateSizeError() {
        throw new Error('Cannot create pixel stream due to incorrect pixels length and size');
    }
    throwValidateFormatError() {
        throw new Error('Cannot create pixel stream due to incorrect pixels format');
    }
    isWidthHeightInteger(width, height) {
        return Number.isInteger(width) && width > 0 && Number.isInteger(height) && height > 0;
    }
    isRgbaElementValid(element) {
        return Number.isFinite(element) && typeof element === 'number' && element >= 0 && element <= 255;
    }
}
exports.PixelStreamBase = PixelStreamBase;
