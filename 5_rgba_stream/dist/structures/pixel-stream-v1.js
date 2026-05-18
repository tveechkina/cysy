"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelStreamV1 = void 0;
const pixel_stream_base_1 = require("../helpers/pixel-stream-base");
const pixel_stream_models_1 = require("../models/pixel-stream.models");
class PixelStreamV1 extends pixel_stream_base_1.PixelStreamBase {
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
        const offset = ((this.width * (y - 1) + (x - 1)) * this.rgbaSize);
        return [
            this.pixels[offset],
            this.pixels[offset + 1],
            this.pixels[offset + 2],
            this.pixels[offset + 3],
        ];
    }
    setPixel(x, y, rgba) {
        this.validateCoordinates(x, y);
        const offset = ((this.width * (y - 1) + (x - 1)) * this.rgbaSize);
        this.pixels[offset] = rgba[0];
        this.pixels[offset + 1] = rgba[1];
        this.pixels[offset + 2] = rgba[2];
        this.pixels[offset + 3] = rgba[3];
        return rgba;
    }
    forEach(mode, callback) {
        if (mode === pixel_stream_models_1.TraverseMode.ROW) {
            let _y = 1;
            let _x = 1;
            let offset = 0;
            while (offset < this.pixels.length) {
                callback([this.pixels[offset], this.pixels[offset + 1], this.pixels[offset + 2], this.pixels[offset + 3]], _x, _y);
                offset += this.rgbaSize;
                _x++;
                if (_x > this.width) {
                    _x = 1;
                    _y++;
                }
            }
        }
        else {
            let _x = 0;
            while (_x < this.width) {
                let _y = 0;
                while (_y < this.height) {
                    const offset = (_y * this.width + _x) * this.rgbaSize;
                    callback([
                        this.pixels[offset],
                        this.pixels[offset + 1],
                        this.pixels[offset + 2],
                        this.pixels[offset + 3]
                    ], _x + 1, _y + 1);
                    _y++;
                }
                _x++;
            }
        }
    }
    validateSize(pixels, width, height) {
        if (pixels.length === width * height * this.rgbaSize && this.isWidthHeightInteger(width, height)) {
            return;
        }
        this.throwValidateSizeError();
    }
    validateFormat(pixels) {
        for (let i = 0; i < pixels.length; i++) {
            const valid = this.isRgbaElementValid(pixels[i]);
            if (!valid) {
                this.throwValidateFormatError();
            }
        }
    }
}
exports.PixelStreamV1 = PixelStreamV1;
