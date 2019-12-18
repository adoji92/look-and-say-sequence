/**
 * implemented by author
 */
function next() {
  return read((c: any) => loop(c, 1));

  function loop(prev: number, count: number): Job {
    return read((c: any) => {
      if (typeof c === 'undefined') {
        // NOTE: 여기 책의 오류 아닌가? write(count, write(prev))로 되어있었음
        return write(count, write(prev));
      } else if (prev === c) {
        return loop(prev, count + 1);
      } else {
        return write(count, write(prev, loop(c, 1)));
      }
    });
  }
}
/**
 * implemented by olaf
 */
type ReadJob = {
  op: 'read';
  next: Job;
};

type WriteJob = {
  op: 'write';
  next?: Job;
  value: number;
};

type Job = ReadJob | WriteJob | Function;
// 미친 함수까지 있구나 dispatch 보니깐

/**
 * implemented by author
 */
function read(next: Job): ReadJob {
  return { op: 'read', next };
}

/**
 * implemented by author
 */
function write(value: number, next?: Job): WriteJob {
  return { op: 'write', next, value };
}

/**
 * implemented by author
 */
function* dispatch(processes: any[]) {
  let readers: number[] = [];

  while (true) {
    let current = processes.pop();
    if (typeof current === 'function') {
      current = current();
    }
    if (typeof current === 'undefined') {
      if (readers.length === 0) break;
      processes.push(readers.pop());
    } else if (current.op === 'read') {
      readers.push(current.next);
    } else {
      processes.push(current.next);
      if (readers.length > 0) {
        const next = readers.pop() as any;
        processes.push(next(current.value));
      } else {
        yield current.value;
      }
    }
  }
}

/**
 * should be implemented by olaf
 */
function init() {}

/**
 * should be implemented by olaf
 * @param n
 */
function* ant(n: number) {}
