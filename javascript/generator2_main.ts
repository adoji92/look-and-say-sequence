import { gen, printGen } from './generator_main';

/**
 * generator_main.ts와는 다르게
 * group, map, concat같은 고차원 함수 써서 만들어보는 소스코드
 * (책에 없고 저자의 소스 레포에 있는데 안 보고 한 번 해보는거임ㅎㅎ)
 */
/////////////////////////////////////////////////////////

function ant(n: number) {
  let s = gen([1]);
  for (let i = 1; i < n; i += 1) {
    s = next(s);
  }
  return s;
}

function next(g: Generator) {
  const g1 = group(g);
  const g2 = map((x: number[]) => gen([x.length, x[0]]), g1);
  return concat(g2);
}

/**
 * @param count 3
 * @param num 1
 * @returns [1 1 1]
 */
function makeNumList(count: number, num: number) {
  const res = [];
  for (let i = 0; i < count; i += 1) {
    res.push(num);
  }
  return res;
}

function* group(g: Generator) {
  let currentNum = g.next().value as number;

  let count = 1;
  for (const value of g) {
    if (value === currentNum) {
      count += 1;
    } else {
      yield makeNumList(count, currentNum);
      currentNum = value as number;
      count = 1;
    }
  }
  yield makeNumList(count, currentNum);
}

function* concat(gs: Generator<any, any, unknown>) {
  for (const g of gs) {
    yield* g;
  }
}

function* map(f: any, g: Generator) {
  for (const mapValue of g) {
    yield f(mapValue);
  }
}

function main() {
  for (let i = 1; i <= 10; i += 1) {
    const a = ant(i);
    process.stdout.write(`i ${i}, `);
    printGen(a);
  }
}

main();
