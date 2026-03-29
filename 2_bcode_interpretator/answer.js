const instructions = {
  "SET A": 0,
  "PRINT A": 1,
  "IFN A": 2,
  RET: 3,
  "DEC A": 4,
  JMP: 5,
};

const interpreter = {
  [instructions["SET A"]]: setFn,
  [instructions["PRINT A"]]: print,
  [instructions["IFN A"]]: ifEqualsZero,
  [instructions["RET"]]: returnFn,
  [instructions["DEC A"]]: decrease,
  [instructions["JMP"]]: jump,
};

const opCodeSize = {
  [instructions["SET A"]]: 2,
  [instructions["PRINT A"]]: 1,
  [instructions["IFN A"]]: 1,
  [instructions["RET"]]: 2,
  [instructions["DEC A"]]: 1,
  [instructions["JMP"]]: 2,
};

function execute(program) {
  let state = {
    pointer: 0,
    program,
    a: undefined,
    result: undefined,
    isFinished: false,
  };

  while (!state.isFinished && state.pointer < state.program.length) {
    const opCode = program[state.pointer];
    const command = interpreter[opCode];

    if (!command) {
      throw new Error("Команда не найдена");
    }

    command.call(state);
  }

  console.log({ state });

  return state.result;
}

function setFn() {
  this.pointer += 1;
  this.a = this.program[this.pointer];
  this.pointer += 1;
}

function print() {
  console.log(this.a);
  this.pointer += 1;
}

function ifEqualsZero() {
  if (this.a === 0) {
    this.pointer += 1;
  } else {
    this.pointer += 1;
    this.pointer += opCodeSize[this.program[this.pointer]];
  }
}

function decrease() {
  this.a -= 1;
  this.pointer += 1;
}

function jump() {
  this.pointer += 1;
  this.pointer = this.program[this.pointer];
}

function returnFn() {
  this.pointer += 1;
  this.result = this.program[this.pointer];
  this.isFinished = true;
}

console.log(
  execute([
    instructions["SET A"],
    10,
    instructions["PRINT A"],
    instructions["IFN A"],
    instructions["RET"],
    0,
    instructions["DEC A"],
    instructions["JMP"],
    2,
  ]),
);
