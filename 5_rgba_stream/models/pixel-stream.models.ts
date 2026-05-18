export type RGBA = [red: number, green: number, blue: number, alpha: number];

export enum TraverseMode {
    ROW = 'RowMajor',
    COL = 'ColMajor'
}

export interface PixelStreamIterator {
}

export interface PixelStream {
    getPixel(x: number, y: number): RGBA;
    setPixel(x: number, y: number, rgba: RGBA): RGBA;
    forEach(mode: TraverseMode, callback: (rgba: RGBA, x: number, y: number) => void): void;
}

export interface RGBAStructure { r: number; g: number; b: number; a: number };

export type PixelDataSize = 's' | 'm' | 'l' | 'xl' | 'xxl';

export const PIXEL_DATA_SIZES: Record<PixelDataSize, number> = {
    s: 128,
    m: 512,
    l: 1024,
    xl: 1080,
    xxl: 1920
}

export enum PixelStreamFormat {
    FLAT = 'flat-array',
    ARRAY_ARRAY = 'array-of-arrays',
    ARRAY_OBJECT = 'array-of-objects',
    TYPES_ARRAY = 'typed-array'
}

export interface PixelStreamBenchmarkInput {
    format: PixelStreamFormat;
    method: TraverseMode;
    stream: PixelStream;
}

export interface PixelStreamBenchmarkOutput {
    name: string;
    format: PixelStreamFormat;
    avg: number;
    min: number;
    max: number
}

export type PixelStreamBenchmarkInputMap = Record<PixelStreamFormat, PixelStreamBenchmarkInput>;
export type PixelStreamBenchmarkOutputMap = Record<PixelStreamFormat, PixelStreamBenchmarkInput>;