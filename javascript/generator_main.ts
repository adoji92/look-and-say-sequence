function ant(n: number) {
  let s = gen([1]);
  for (let i = 1; i < n; i += 1) {
    s = next(s);
  }
  return s;
}

function printAnt(antGen: Generator) {
  for (const num of antGen) {
    process.stdout.write((num as number).toString());
  }
  console.log(); // NOTE: for new line
}

function* gen(x: number[]) {
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
    printAnt(a);
  }
}

main();
