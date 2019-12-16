import __ from 'lodash';

/**
 *
 * @param ns [1, 3, 1, 1, 2, 2, 2, 1]
 * @returns [ [ 1 ], [ 3 ], [ 1, 1 ], [ 2, 2, 2 ], [ 1 ] ]
 */
function group(ns: number[]): number[][] {
  const res: number[][] = [];
  let currentNum = ns[0];
  let temp: number[] = [currentNum];

  for (let i = 1; i < ns.length; i += 1) {
    const n = ns[i];
    if (currentNum === n) {
      temp.push(currentNum);
    } else {
      res.push(temp);
      currentNum = n;
      temp = [currentNum];
    }
  }

  if (temp.length !== 0) {
    res.push(temp);
  }
  return res;
}

/**
 * @param ns: [1]
 * @returns [1, 1]
 *
 * @param2 ns: [2, 2, 2]
 * @returns2 [3, 2]
 */
function antifySingle(ns: number[]) {
  return [ns.length, ns[0]];
}

function ant(ns: number[]): number[] {
  return __.flatten(group(ns).map(antifySingle));
}

/**
 * prints
 * 2 [ 1, 1 ]
 * 3 [ 2, 1 ]
 * 4 [ 1, 2, 1, 1 ]
 * 5 [ 1, 1, 1, 2, 2, 1 ]
 * 6 [ 3, 1, 2, 2, 1, 1 ]
 * 7 [ 1, 3, 1, 1, 2, 2, 2, 1 ]
 * 8 [ 1, 1, 1, 3, 2, 1, 3, 2, 1, 1 ]
 * 9 [ 3, 1, 1, 3, 1, 2, 1, 1, 1, 3, 1, 2, 2, 1 ]
 * 10 [ 1, 3, 2, 1, 1, 3, 1, 1, 1, 2, 3, 1, 1, 3, 1, 1, 2, 2, 1, 1 ]
 */
function main() {
  let antSeq = [1];
  for (let i = 1; i < 10; i += 1) {
    antSeq = ant(antSeq);
    console.log(i + 1, antSeq);
  }
}

main();
