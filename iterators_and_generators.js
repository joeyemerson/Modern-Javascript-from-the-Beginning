// Iterator
const nameIterator = names => {
  let nextIndex = 0;

  return {
    next: () => {
      return nextIndex < names.length ?
        { value: names[nextIndex++], done: false } :
      	{ done: true };
    }
  }
}

const namesArr = [
  'Jack',
  'Jill',
  'John'
];

const names = nameIterator(namesArr);

console.log(names.next());
console.log(names.next());
console.log(names.next());
console.log(names.next());

// Generator
function* sayNames() {
  yield 'Jack';
  yield 'Jill';
  yield 'John';
}

const name = sayNames();

console.log(name.next());


function* createIds() {
  let index = 0;
  while(true) {
    yield index++;
  }
}

const gen = createIds();

console.log(gen.next().value)
