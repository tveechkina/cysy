import { PixelStreamBase } from "../helpers/pixel-stream-base";
import { PixelStream, RGBA, RGBAStructure, TraverseMode } from "../models/pixel-stream.models";

export class PixelStreamV3 extends PixelStreamBase<RGBAStructure[]> implements PixelStream {
    protected readonly width: number;
    protected readonly height: number;

    private readonly pixels: RGBAStructure[];

    constructor(pixels: RGBAStructure[], width: number, height: number) {
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
        const pixel = this.pixels[cell];

        return [pixel.r, pixel.g, pixel.b, pixel.a];
    }

    setPixel(x: number, y: number, rgba: RGBA): RGBA {
        this.validateCoordinates(x, y);

        const cell = this.width * (y - 1) + (x - 1);

        this.pixels[cell] = { r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] };

        return rgba;
    }

    forEach(mode: TraverseMode, callback: (rgba: RGBA, x: number, y: number) => void): void {
        if (mode === TraverseMode.ROW) {
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
        } else {
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

    protected validateSize(pixels: RGBAStructure[], width: number, height: number): void {
        if (pixels.length === width * height && this.isWidthHeightInteger(width, height)) {
            return;
        }

        this.throwValidateSizeError();
    }

    protected validateFormat(pixels: RGBAStructure[]): void {
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