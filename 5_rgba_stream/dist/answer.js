"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_generator_1 = require("./helpers/data-generator");
const pixel_stream_benchmark_1 = require("./helpers/pixel-stream-benchmark");
const pixel_stream_models_1 = require("./models/pixel-stream.models");
const pixel_stream_v1_1 = require("./structures/pixel-stream-v1");
const pixel_stream_v2_1 = require("./structures/pixel-stream-v2");
const pixel_stream_v3_1 = require("./structures/pixel-stream-v3");
const pixel_stream_v4_1 = require("./structures/pixel-stream-v4");
const dataMapper = (({ r, g, b, a }) => [r, g, b, a]);
// const dataS = generatePixels(PIXEL_DATA_SIZES.s, PIXEL_DATA_SIZES.s);
// const dataM = generatePixels(PIXEL_DATA_SIZES.m, PIXEL_DATA_SIZES.m);
// const dataL = generatePixels(PIXEL_DATA_SIZES.l, PIXEL_DATA_SIZES.l);
const dataXL = (0, data_generator_1.generatePixels)(pixel_stream_models_1.PIXEL_DATA_SIZES.xl, pixel_stream_models_1.PIXEL_DATA_SIZES.xxl);
// const testV1S = new PixelStreamV1(dataS.data.flatMap(dataMapper), dataS.width, dataS.height);
// const testV2S = new PixelStreamV2(dataS.data.map(dataMapper), dataS.width, dataS.height);
// const testV3S = new PixelStreamV3(dataS.data, dataS.width, dataS.height);
// const testV4S = new PixelStreamV4(new Uint8Array(dataS.data.flatMap(dataMapper)), dataS.width, dataS.height);
// const streamSMap: PixelStreamBenchmarkInputMap = {
//     [PixelStreamFormat.FLAT]: {
//         format: PixelStreamFormat.FLAT,
//         method: TraverseMode.RowMajor,
//         stream: testV1S
//     },
//     [PixelStreamFormat.ARRAY_ARRAY]: {
//         format: PixelStreamFormat.ARRAY_ARRAY,
//         method: TraverseMode.RowMajor,
//         stream: testV2S
//     },
//     [PixelStreamFormat.ARRAY_OBJECT]: {
//         format: PixelStreamFormat.ARRAY_OBJECT,
//         method: TraverseMode.RowMajor,
//         stream: testV3S
//     },
//     [PixelStreamFormat.TYPES_ARRAY]: {
//         format: PixelStreamFormat.TYPES_ARRAY,
//         method: TraverseMode.RowMajor,
//         stream: testV4S
//     },
// };
// const testV1M = new PixelStreamV1(dataM.data.flatMap(dataMapper), dataM.width, dataM.height);
// const testV2M = new PixelStreamV2(dataM.data.map(dataMapper), dataM.width, dataM.height);
// const testV3M = new PixelStreamV3(dataM.data, dataM.width, dataM.height);
// const testV4M = new PixelStreamV4(new Uint8Array(dataM.data.flatMap(dataMapper)), dataM.width, dataM.height);
// const streamMMap: PixelStreamBenchmarkInputMap = {
//     [PixelStreamFormat.FLAT]: {
//         format: PixelStreamFormat.FLAT,
//         method: TraverseMode.RowMajor,
//         stream: testV1M
//     },
//     [PixelStreamFormat.ARRAY_ARRAY]: {
//         format: PixelStreamFormat.ARRAY_ARRAY,
//         method: TraverseMode.RowMajor,
//         stream: testV2M
//     },
//     [PixelStreamFormat.ARRAY_OBJECT]: {
//         format: PixelStreamFormat.ARRAY_OBJECT,
//         method: TraverseMode.RowMajor,
//         stream: testV3M
//     },
//     [PixelStreamFormat.TYPES_ARRAY]: {
//         format: PixelStreamFormat.TYPES_ARRAY,
//         method: TraverseMode.RowMajor,
//         stream: testV4M
//     },
// };
// const testV1L = new PixelStreamV1(dataL.data.flatMap(dataMapper), dataL.width, dataL.height);
// const testV2L = new PixelStreamV2(dataL.data.map(dataMapper), dataL.width, dataL.height);
// const testV3L = new PixelStreamV3(dataL.data, dataL.width, dataL.height);
// const testV4L = new PixelStreamV4(new Uint8Array(dataL.data.flatMap(dataMapper)), dataL.width, dataL.height);
// const streamLMap: PixelStreamBenchmarkInputMap = {
//     [PixelStreamFormat.FLAT]: {
//         format: PixelStreamFormat.FLAT,
//         method: TraverseMode.RowMajor,
//         stream: testV1L
//     },
//     [PixelStreamFormat.ARRAY_ARRAY]: {
//         format: PixelStreamFormat.ARRAY_ARRAY,
//         method: TraverseMode.RowMajor,
//         stream: testV2L
//     },
//     [PixelStreamFormat.ARRAY_OBJECT]: {
//         format: PixelStreamFormat.ARRAY_OBJECT,
//         method: TraverseMode.RowMajor,
//         stream: testV3L
//     },
//     [PixelStreamFormat.TYPES_ARRAY]: {
//         format: PixelStreamFormat.TYPES_ARRAY,
//         method: TraverseMode.RowMajor,
//         stream: testV4L
//     },
// };
const testV1XL = new pixel_stream_v1_1.PixelStreamV1(dataXL.data.flatMap(dataMapper), dataXL.width, dataXL.height);
const testV2XL = new pixel_stream_v2_1.PixelStreamV2(dataXL.data.map(dataMapper), dataXL.width, dataXL.height);
const testV3XL = new pixel_stream_v3_1.PixelStreamV3(dataXL.data, dataXL.width, dataXL.height);
const testV4XL = new pixel_stream_v4_1.PixelStreamV4(new Uint8Array(dataXL.data.flatMap(dataMapper)), dataXL.width, dataXL.height);
const streamXLMapRow = {
    [pixel_stream_models_1.PixelStreamFormat.FLAT]: {
        format: pixel_stream_models_1.PixelStreamFormat.FLAT,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV1XL
    },
    [pixel_stream_models_1.PixelStreamFormat.ARRAY_ARRAY]: {
        format: pixel_stream_models_1.PixelStreamFormat.ARRAY_ARRAY,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV2XL
    },
    [pixel_stream_models_1.PixelStreamFormat.ARRAY_OBJECT]: {
        format: pixel_stream_models_1.PixelStreamFormat.ARRAY_OBJECT,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV3XL
    },
    [pixel_stream_models_1.PixelStreamFormat.TYPES_ARRAY]: {
        format: pixel_stream_models_1.PixelStreamFormat.TYPES_ARRAY,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV4XL
    },
};
const streamXLMapColumn = {
    [pixel_stream_models_1.PixelStreamFormat.FLAT]: {
        format: pixel_stream_models_1.PixelStreamFormat.FLAT,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV1XL
    },
    [pixel_stream_models_1.PixelStreamFormat.ARRAY_ARRAY]: {
        format: pixel_stream_models_1.PixelStreamFormat.ARRAY_ARRAY,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV2XL
    },
    [pixel_stream_models_1.PixelStreamFormat.ARRAY_OBJECT]: {
        format: pixel_stream_models_1.PixelStreamFormat.ARRAY_OBJECT,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV3XL
    },
    [pixel_stream_models_1.PixelStreamFormat.TYPES_ARRAY]: {
        format: pixel_stream_models_1.PixelStreamFormat.TYPES_ARRAY,
        method: pixel_stream_models_1.TraverseMode.ROW,
        stream: testV4XL
    },
};
console.log((0, pixel_stream_benchmark_1.pixelStreamForEachBenchmark)(streamXLMapRow));
console.log((0, pixel_stream_benchmark_1.pixelStreamForEachBenchmark)(streamXLMapColumn));
