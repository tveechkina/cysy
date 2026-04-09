class BCD {
   #buffer;
   #filler = 15;

   constructor(number) {
      this.#saveToBuffer(number);
   }

   toBigint() {
      return BigInt(this.#getOriginalNumber());
   }

   toNumber() {
      return this.#getOriginalNumber();
   }

   toString() {
      return this.#getOriginalNumber().toString();
   }

   at(index) {
      return this.#getOriginalNumberArray().at(index);
   }

   #saveToBuffer(number) {
      const numberArray = this.#getNormalizedNumberArray(number);

      const decimalBytesArray = [];
      let leftPointer = 0;
      let rightPointer = leftPointer + 1;

      while (leftPointer < numberArray.length) {
         const rightNumber = rightPointer === numberArray.length ? numberArray[leftPointer] : numberArray[rightPointer];
         const leftNumber = rightPointer === numberArray.length ? this.#filler : numberArray[leftPointer];

         decimalBytesArray.push(leftNumber << 4 | rightNumber);

         rightPointer = rightPointer + 2;
         leftPointer = leftPointer + 2;
      }

      this.#buffer = new Uint8Array(decimalBytesArray);
   }


   #getNormalizedNumberArray(number) {
      const result = [];
      const divider = 10;
      let saved = number;

      if (saved === 0) {
         result.push(0);
         return result;
      }

      while (saved > 0) {
         const value = saved % divider;

         result.unshift(value);
         saved = (saved - value) / divider;
      }

      return result;
   }

   #getOriginalNumber() {
      const numberArray = this.#getOriginalNumberArray();

      let pointer = numberArray.length - 1;
      let result = 0;
      let multiplier = 1;

      while (pointer >= 0) {
         result += numberArray[pointer] * multiplier;
         multiplier *= 10;
         pointer--;
      }

      return result;
   }

   #getOriginalNumberArray() {
      const buffer = this.#buffer;
      const numberArray = [];

      let pointer = 0;

      for (pointer; pointer < buffer.length; pointer++) {
         const decimalByte = buffer.at(pointer);
         const leftNumber = decimalByte >> 4;
         const rightNumber = decimalByte & 0b1111;

         if (leftNumber !== this.#filler) {
            numberArray.push(leftNumber);
         }
         numberArray.push(rightNumber);
      }

      return numberArray;
   }
}

const n = new BCD(1234567);

console.log(n.toNumber());
console.log(n.toBigint());
console.log(n.toString());
console.log(n.at(1));
console.log(n.at(-1));