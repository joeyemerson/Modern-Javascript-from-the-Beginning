# Error Handling & Regex

## Error Handling

### Try / Catch / Finally (optional)

```js
try {
  myFunction(); // not defined

  // Produce TypeError
  // null.myFunction();

  // Produce SyntaxError
  // eval('Hello World');

  // Produce URIError
  // decodeURIComponent('%');
} catch (e) {
  console.log(e); // ReferenceError: myFunction is not defined
  console.log(e.name); // ReferenceError
  console.log(e instanceof ReferenceError); // true
  console.log(e instanceof TypeError); // false
} finally {
  // Whatever is here runs no matter the reusult
  console.log('Finally runs no matter what');
}

console.log('Program continues...');
```

```js
const user = { email: 'jdoe@gmail.com' };

try {
  myFunction(); // not defined
  if (!user.name) {
    // throw 'User has no name';
    throw new SyntaxError('User has no name');
  }
} catch (e) {
  console.log(e); // SyntaxError: User has no name
}
```

## Regex

I skipped this due to high familiarity with the topic...
