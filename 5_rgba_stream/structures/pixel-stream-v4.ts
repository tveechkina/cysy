import { PixelStreamBase } from "../helpers/pixel-stream-base";
import { PixelStream, RGBA, TraverseMode } from "../models/pixel-stream.models";

export class PixelStreamV4 extends PixelStreamBase<Uint8Array> implements PixelStream {
    protected readonly width: number;
    protected readonly height: number;

    private readonly pixels: Uint8Array;

    constructor(pixels: Uint8Array, width: number, height: number) {
        super();

        this.validateSize(pixels, width, height);
        this.validateFormat(pixels);

        this.pixels = pixels;
        this.width = width;
        this.height = height;
    }

    getPixel(x: number, y: number): RGBA {
        this.validateCoordinates(x, y);

        const cell = this.width * (y - 1) + (x - 1);
        const offset = cell * this.rgbaSize;

        return [
            this.pixels[offset],
            this.pixels[offset + 1],
            this.pixels[offset + 2],
            this.pixels[offset + 3]
        ];
    }

    setPixel(x: number, y: number, rgba: RGBA): RGBA {
        this.validateCoordinates(x, y);

        const cell = this.width * (y - 1) + (x - 1);
        const offset = cell * this.rgbaSize;

        this.pixels[offset] = rgba[0];
        this.pixels[offset + 1] = rgba[1];
        this.pixels[offset + 2] = rgba[2];
        this.pixels[offset + 3] = rgba[3];

        return rgba;
    }

    forEach(mode: TraverseMode, callback: (rgba: RGBA, x: number, y: number) => void): void {
        if (mode === TraverseMode.ROW) {
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
        } else {
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

    protected validateSize(pixels: Uint8Array, width: number, height: number): void {
        if (pixels.length === width * height * this.rgbaSize && this.isWidthHeightInteger(width, height)) {
            return;
        }

        this.throwValidateSizeError();
    }

    protected validateFormat(pixels: Uint8Array): void {
        if (pixels instanceof Uint8Array) {
            return;
        }

        this.throwValidateFormatError();
    }
}
