import { PixelStreamBase } from "../helpers/pixel-stream-base";
import { RGBA, PixelStream, TraverseMode } from "../models/pixel-stream.models";

export class PixelStreamV2 extends PixelStreamBase<RGBA[]> implements PixelStream {
    protected readonly width: number;
    protected readonly height: number;

    private readonly pixels: RGBA[];

    constructor(pixels: RGBA[], width: number, height: number) {
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

        return [
            this.pixels[cell][0],
            this.pixels[cell][1],
            this.pixels[cell][2],
            this.pixels[cell][3]
        ];
    }

    setPixel(x: number, y: number, rgba: RGBA): RGBA {
        this.validateCoordinates(x, y);

        const cell = this.width * (y - 1) + (x - 1);

        this.pixels[cell][0] = rgba[0];
        this.pixels[cell][1] = rgba[1];
        this.pixels[cell][2] = rgba[2];
        this.pixels[cell][3] = rgba[3];

        return rgba;
    }

    forEach(mode: TraverseMode, callback: (rgba: RGBA, x: number, y: number) => void): void {
        if (mode === TraverseMode.ROW) {
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
        } else {
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

    protected validateSize(pixels: RGBA[], width: number, height: number): void {
        if (pixels.length === width * height && this.isWidthHeightInteger(width, height)) {
            return;
        }

        this.throwValidateSizeError();
    }

    protected validateFormat(pixels: RGBA[]): void {
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