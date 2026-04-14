function cyclicLeftShift(bytes, count) {
    let counter = count >= 32 ? count % 32 : count;
    let result = bytes;

    while (counter > 0) {
        const leftBit = result >>> 31;

        result = result << 1 >>> 0 | leftBit;
        counter = counter - 1;
    }


    return result;
}

function cyclicRightShift(bytes, count) {
    let counter = count >= 32 ? count % 32 : count;
    let result = bytes;

    while (counter > 0) {
        const rightBit = result & 1;

        result = result >>> 1 | rightBit << 31;
        counter = counter - 1;
    }

    return result;
}


// Биты отбрасываемые из-за переполнения слева дополняются справа
console.log(cyclicLeftShift(0b10000000_00000000_00000000_00000001, 1) === 0b00000000_00000000_00000000_00000011);

// Биты отбрасываемые из-за переполнения cправа дополняются слева
console.log(cyclicRightShift(0b10000000_00000000_00000000_00000001, 2) === 0b01100000_00000000_00000000_00000000);

