"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelStreamV2 = void 0;
const pixel_stream_base_1 = require("../helpers/pixel-stream-base");
const pixel_stream_models_1 = require("../models/pixel-stream.models");
class PixelStreamV2 extends pixel_stream_base_1.PixelStreamBase {
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
        return [
            this.pixels[cell][0],
            this.pixels[cell][1],
            this.pixels[cell][2],
            this.pixels[cell][3]
        ];
    }
    setPixel(x, y, rgba) {
        this.validateCoordinates(x, y);
        const cell = this.width * (y - 1) + (x - 1);
        this.pixels[cell][0] = rgba[0];
        this.pixels[cell][1] = rgba[1];
        this.pixels[cell][2] = rgba[2];
        this.pixels[cell][3] = rgba[3];
        return rgba;
    }
    forEach(mode, callback) {
        if (mode === pixel_stream_models_1.TraverseMode.ROW) {
            let _y = 0;
            while (_y < this.height) {
                let _x = 0;
                while (_x < this.width) {
                    const cell = _y * this.width + _x;
                    callback([this.pixels[cell][0], this.pixels[cell][1], this.pixels[cell][2], this.pixels[cell][3]], _x + 1, _y + 1);
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
                    callback([this.pixels[cell][0], this.pixels[cell][1], this.pixels[cell][2], this.pixels[cell][3]], _x + 1, _y + 1);
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
            const valid = Array.isArray(pixels[i]) && pixels[i].length === this.rgbaSize &&
                this.isRgbaElementValid(pixels[i][0]) &&
                this.isRgbaElementValid(pixels[i][1]) &&
                this.isRgbaElementValid(pixels[i][2]) &&
                this.isRgbaElementValid(pixels[i][3]);
            if (!valid) {
                this.throwValidateFormatError();
            }
        }
    }
}
exports.PixelStreamV2 = PixelStreamV2;
