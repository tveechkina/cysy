import { RGBAStructure } from "../models/pixel-stream.models";

export function generatePixels(width: number, height: number): { data: RGBAStructure[], width: number, height: number } {
    const data: RGBAStructure[] = [];

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

function getRandomRGBAElement(): number {
    return Math.floor(Math.random() * 253);
}
