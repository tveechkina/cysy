"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelStreamFormat = exports.PIXEL_DATA_SIZES = exports.TraverseMode = void 0;
var TraverseMode;
(function (TraverseMode) {
    TraverseMode["ROW"] = "RowMajor";
    TraverseMode["COL"] = "ColMajor";
})(TraverseMode || (exports.TraverseMode = TraverseMode = {}));
;
exports.PIXEL_DATA_SIZES = {
    s: 128,
    m: 512,
    l: 1024,
    xl: 1080,
    xxl: 1920
};
var PixelStreamFormat;
(function (PixelStreamFormat) {
    PixelStreamFormat["FLAT"] = "flat-array";
    PixelStreamFormat["ARRAY_ARRAY"] = "array-of-arrays";
    PixelStreamFormat["ARRAY_OBJECT"] = "array-of-objects";
    PixelStreamFormat["TYPES_ARRAY"] = "typed-array";
})(PixelStreamFormat || (exports.PixelStreamFormat = PixelStreamFormat = {}));
