"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelStreamForEachBenchmark = pixelStreamForEachBenchmark;
function pixelStreamForEachBenchmark(streamMap) {
    return Object.values(streamMap).map(stream => benchmarkForEach(stream));
}
function benchmarkForEach(stream) {
    warmUp(stream);
    const measureCount = 10;
    const measures = [];
    for (let i = 0; i < measureCount; i++) {
        const start = performance.now();
        let sum = 0;
        stream.stream.forEach(stream.method, ([r, g, b, a], x, y) => {
            sum += r + g + b + a + x + y;
        });
        const finish = performance.now();
        measures.push(finish - start);
    }
    return {
        name: `forEach ${stream.method}`,
        format: stream.format,
        avg: measures.reduce((acc, measure) => acc + measure) / measureCount,
        min: Math.min(...measures),
        max: Math.max(...measures),
    };
}
function warmUp(stream, count = 5) {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        stream.stream.forEach(stream.method, ([r, g, b, a], x, y) => {
            sum += r + g + b + a + x + y;
        });
    }
}
