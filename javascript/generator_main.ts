function ant(n: number) {
  let s = gen([1]);
  for (let i = 1; i < n; i += 1) {
    s = next(s);
  }
  return s;
}

export function printGen(g: Generator) {
  let count = 0;
  for (const num of g) {
    // console.log('num', num);
    process.stdout.write((num as number).toString());
    count += 1;
  }
  console.log(); // NOTE: for new line
  // console.log('printGenCount', count);
}

export function* gen(x: any) {
  yield* x;
}

function* next(g: Generator) {
  let prev = g.next().value;
  let count = 1;
  for (let value of g) {
    if (value === prev) {
      count += 1;
    } else {
      yield* [count, prev];
      prev = value;
      count = 1;
    }
  }
  yield* [count, prev];
}

function main() {
  for (let i = 1; i <= 10; i += 1) {
    const a = ant(i);
    process.stdout.write(`i ${i}, `);
    printGen(a);
  }
}

// main();
