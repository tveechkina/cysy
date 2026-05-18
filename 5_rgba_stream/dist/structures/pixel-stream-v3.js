"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelStreamV3 = void 0;
const pixel_stream_base_1 = require("../helpers/pixel-stream-base");
const pixel_stream_models_1 = require("../models/pixel-stream.models");
class PixelStreamV3 extends pixel_stream_base_1.PixelStreamBase {
    constructor(pixels, width, height) {
        super();
        this.validateSize(pixels, width, height);
        this.validateFormat(pixels);
        this.pixels = pixels;
        this.width = width;
        this.height = height;
    }
    getPixel(x, y) {
        this.validateCoordinates(x, y);
        const cell = this.width * (y - 1) + (x - 1);
        const pixel = this.pixels[cell];
        return [pixel.r, pixel.g, pixel.b, pixel.a];
    }
    setPixel(x, y, rgba) {
        this.validateCoordinates(x, y);
        const cell = this.width * (y - 1) + (x - 1);
        this.pixels[cell] = { r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] };
        return rgba;
    }
    forEach(mode, callback) {
        if (mode === pixel_stream_models_1.TraverseMode.ROW) {
            let _y = 0;
            while (_y < this.height) {
                let _x = 0;
                while (_x < this.width) {
                    const cell = _y * this.width + _x;
                    const pixel = this.pixels[cell];
                    callback([pixel.r, pixel.g, pixel.b, pixel.a], _x + 1, _y + 1);
                    _x++;
                }
                _y++;
            }
        }
        else {
            let _x = 0;
            while (_x < this.width) {
                let _y = 0;
                while (_y < this.height) {
                    const cell = _y * this.width + _x;
                    const pixel = this.pixels[cell];
                    callback([pixel.r, pixel.g, pixel.b, pixel.a], _x + 1, _y + 1);
                    _y++;
                }
                _x++;
            }
        }
    }
    validateSize(pixels, width, height) {
        if (pixels.length === width * height && this.isWidthHeightInteger(width, height)) {
            return;
        }
        this.throwValidateSizeError();
    }
    validateFormat(pixels) {
        for (let i = 0; i < pixels.length; i++) {
            const valid = 'r' in pixels[i] && this.isRgbaElementValid(pixels[i].r) &&
                'g' in pixels[i] && this.isRgbaElementValid(pixels[i].g) &&
                'b' in pixels[i] && this.isRgbaElementValid(pixels[i].b) &&
                'a' in pixels[i] && this.isRgbaElementValid(pixels[i].a);
            if (!valid) {
                this.throwValidateFormatError();
            }
        }
    }
}
exports.PixelStreamV3 = PixelStreamV3;
