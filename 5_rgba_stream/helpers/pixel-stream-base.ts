
export abstract class PixelStreamBase<PixelFormat> {
    protected abstract readonly height: number;
    protected abstract readonly width: number;

    protected readonly rgbaSize = 4;

    protected abstract validateSize(pixels: PixelFormat, width: number, height: number): void;
    protected abstract validateFormat(pixels: PixelFormat): void;

    protected validateCoordinates(x: number, y: number): void {
        if (y > this.height || y < 1) {
            throw new Error('There is no ' + y + '\'th row');
        }

        if (x > this.width || x < 1) {
            throw new Error('There is no ' + x + '\'th column');
        }
    }

    protected throwValidateSizeError(): never {
        throw new Error('Cannot create pixel stream due to incorrect pixels length and size');
    }

    protected throwValidateFormatError(): never {
        throw new Error('Cannot create pixel stream due to incorrect pixels format');
    }

    protected isWidthHeightInteger(width: number, height: number): boolean {
        return Number.isInteger(width) && width > 0 && Number.isInteger(height) && height > 0;
    }

    protected isRgbaElementValid(element: unknown): boolean {
        return Number.isFinite(element) && typeof element === 'number' && element >= 0 && element <= 255;
    }
}