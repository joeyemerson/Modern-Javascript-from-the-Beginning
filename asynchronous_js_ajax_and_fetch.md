# Asynchronous JavaScript - Ajax and Fetch

## What is Ajax? (Asynchronous JavaScript and XML)

- Set of web technologies -- not a language
- Send & receive data asynchronously
- Does not interfere with the current page
- JSON has replaced XML for the most part

### XmlHttpRequest (XHR) Object

- API in the form of an object
- Provided by browser's JS environment
- Methods transfer data between client / server
- Can be used with other protocols than HTTP
- Can work with data other than XML (JSON, plain text)

### Libraries and Other Methods

- Fetch API
- Axios
- Superagent
- jQuery
- Node HTTP

### XHR Object and Working with Text

This example assumes there is a html file with a button with id 'button,' an element with id 'output,' and a data.txt file in the same directory.

```js
document.getElementByID('button').addEventListener('click', loadData);

function loadData() {
  // Create an XHR Object
  const xhr = new XMLHttpRequest();

  // OPEN
  // Pass in params => (type of request, data, optional async flag)
  xhr.open('GET', 'data.txt', true);

  // OPTIONAL - used for spinners/loaders
  xhr.onprogress = function() {
    console.log('READYSTATE', xhr.readyState);
  };

  // Will wait for readyState of 4
  xhr.onload = function() {
    if (this.status === 200) {
      document.getElementById('output').innerHTML = `
        <h1>${this.responseText}</h1>
      `;
    }
  };

  // older syntax -- can now can use onload
  // xhr.onreadystatechange = function() {
  //   if (this.status === 200 && this.readyState === 4) {
  //     console.log(this.responseText)
  //   }
  // }

  // readyState Values
  // 0: request not initialized
  // 1: server connection established
  // 2: request received
  // 3: processing request
  // 4: request finished and response is ready

  // In case something goes wrong...
  xhr.onerror = function() {
    console.log('Request error...');
  };

  xhr.send();

  // Common HTTP Statuses
  // 200: "ok"
  // 403: "Forbidden"
  // 404: "Not Found"
}
```

### Ajax and JSON

#### customer.json

```json
{
  "id": 1,
  "name": "John Doe",
  "company": "123 Designs",
  "phone": "111-222-3344"
}
```

#### customers.json

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "company": "123 Designs",
    "phone": "111-222-3344"
  },
  {
    "id": 2,
    "name": "Steve Smith",
    "company": "Hello Productions",
    "phone": "345-678-9012"
  },
  {
    "id": 3,
    "name": "Tara Williams",
    "company": "My Company",
    "phone": "098-765-4321"
  }
]
```

#### app.js

_Pretend you have an html file with all the things you are manipulating..._

```js
document.getElementById('button1').addEventListener('click', loadCustomer);
document.getElementById('button2').addEventListener('click', loadCustomers);

// Load single customer
function loadCustomer(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customer.json', true);

  xhr.onload = function() {
    if (this.status === 200) {
      // Convert from JSON string to js object
      const customer = JSON.parse(this.responseText);

      const output = `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `;

      document.getElementById('customer').innerHTML = output;
    }
  };

  xhr.send();
}

// Load multiple customers
function loadCustomers(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customers.json', true);

  xhr.onload = function() {
    if (this.status === 200) {
      // Convert from JSON string to js object
      const customers = JSON.parse(this.responseText);

      let output = '';

      customers.forEach(customer => {
        output += `
          <ul>
            <li>ID: ${customer.id}</li>
            <li>Name: ${customer.name}</li>
            <li>Company: ${customer.company}</li>
            <li>Phone: ${customer.phone}</li>
          </ul>
        `;
      });

      document.getElementById('customers').innerHTML = output;
    }
  };

  xhr.send();
}
```

### Data from an External API

#### app.js

```js
document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes() {
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = '';

      if (response.type === 'success') {
        response.value.forEach(item => {
          output += `<li>${item.joke}</li>`;
        });
      } else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('.jokes').innerHTML = output;
    }
  };

  xhr.send();

  e.preventDefault();
}
```

## What is an API?

**API**

- Application Programming Interface
- Contract provided by one piece of software to another
- Structured request and response
- The previous example uses an API that takes a request and reponds with a response

**REST API's**

- Representational State Transfer
- Architecture style for designing networked applications
- Relies on a stateless, client-server protocol, almost always HTTP
- Treats server objects as resources that can be created or destroyed
- Can be used by virtually any programming language
- All APIs have their own rules and structure

**HTTP Requests**

- GET: Retrieve data from a specified resource
- POST: Submit data to be processed to a specified resource
- PUT: Update a specified resource
- DELETE: Delete a specified resource

- HEAD: Same as GET, but does not return a body
- OPTIONS: Returns the supported HTTP methods
- PATCH: Update partial resources

<!-- prettier-ignore -->
**API Endpoint Examples** \
GET       https://someurl.com/api/users     Get all users \
GET       https://someurl.com/api/users/1   Get single user \
POST      https://someurl.com/api/users     Add user \
PUT       https://someurl.com/api/users/1   Update user \
DELETE    https://someurl.com/api/users/1   Delete user

## Callback Functions

#### app.js

```js
const posts = [
  { title: 'Post One', body: 'This is post one.' }
  { title: 'Post Two', body: 'This is post two.' }
];

function createPost(post) {
  setTimeout(function() {
    posts.push(post);
  }, 2000);
}

function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

createPost({ title: 'Post Three', body: 'This is postt three.' });

getPosts(); // will only return posts 1 and 2 because createPost() wait 2 seconds and getPosts waits 1
```

#### app.js (async)

```js
const posts = [
  { title: 'Post One', body: 'This is post one.' }
  { title: 'Post Two', body: 'This is post two.' }
];

function createPost(post, callback) {
  setTimeout(function() {
    posts.push(post);
    callback();
  }, 2000);
}

function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

createPost({ title: 'Post Three', body: 'This is post three.' }, getPosts);

```

## Promises

#### app.js (async with promises)

```js
const posts = [
  { title: 'Post One', body: 'This is post one.' }
  { title: 'Post Two', body: 'This is post two.' }
];

function createPost(post) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      posts.push(post);

      const error = true;

      if (!error) {
        resolve();
      } else {
        reject('Error: Something went wrong')
      }
    }, 2000);
  });
}

function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

createPost({ title: 'Post Three', body: 'This is post three.' })
  .then(getPosts)
  .catch(function(err) {
    console.log(err);
  });

```

## Fetch API

#### posts.json

```json
[
  {
    "title": "Post One",
    "body": "This is post one"
  },
  {
    "title": "Post Two",
    "body": "This is post two"
  },
  {
    "title": "Post Three",
    "body": "This is post three"
  }
]
```

#### app.js

```js
document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJSON);
document.getElementById('button3').addEventListener('click', getExternal);

function getText() {
  fetch('test.txt')
    .then(function(res) {
      return res.text();
    })
    .then(function(data) {
      document.getElementById('output').innerHTML = data;
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getJSON() {
  fetch('posts.json')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      let output = '';
      data.forEach(function(post) {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getExternal() {
  fetch('https://api.github.com/users')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      let output = '';
      data.forEach(function(user) {
        output += `<li>${user.login}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(function(err) {
      console.log(err);
    });
}
```

### Error Handling With Fetch

I did not mention this in the lecture but error handling with fetch is a bit different than with something like Axios or jQuery. If there is an http error, it will not fire off .catch automatically. You have to check the response and throw an error yourself. Here is an example...

```js
fetch('https://devcamper.io/api/v1/bootcamps/34343')
  .then(res => res.json())
  .then(res => {
    if (!res.ok) {
      throw new Error(res.error);
    }
    return res;
  })
  .catch(err => console.log(err));

// I would suggest creating a separate function for error handling

function handleErrors(res) {
  if (!res.ok) throw new Error(res.error);
  return res;
}

fetch('https://devcamper.io/api/v1/bootcamps/34343')
  .then(res => res.json())
  .then(handleErrors)
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
```

## Arrow Functions

#### Examples

```js
const sayHello = () => {
  return 'Hello';
};

// Can do without braces if on one line
// const sayHello = () => 'Hello';
console.log(sayHello()); // 'Hello'

// Return an object - parentheses
const sayHi = () => ({ msg: 'Hi' });
```

```js
// single parameter doesn't need parens
const sayHi = name => console.log(`Hi ${name}`);

// must use parens for multiple parameters
const sayHello = (firstName, lastName) => console.log(`Hello, ${firstName} ${lastName}.`);
```

#### Arrow Functions as Callbacks

```js
const users = ['Nathan', 'John', 'William'];

const nameLengths = users.map(name => name.length);

console.log(nameLengths);
```

#### Fetch with Arrow Functions

```js
document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJSON);
document.getElementById('button3').addEventListener('click', getExternal);

function getText() {
  fetch('test.txt')
    .then(res => res.text())
    .then(data => {
      document.getElementById('output').innerHTML = data;
    })
    .catch(err => console.log(err));
}

function getJSON() {
  fetch('posts.json')
    .then(res => res.json())
    .then(data => {
      let output = '';
      data.forEach(post => {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}

function getExternal() {
  fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => {
      let output = '';
      data.forEach(user => {
        output += `<li>${user.login}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}
```

## async / await (ES7)

```js
async function myFunc() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello'), 1000);
  });

  const err = true;

  if (!err) {
    const res = await promise;
    return res;
  } else {
    await Promise.reject(new Error('Something went wrong'));
  }
}

myFunc()
  .then(res => console.log(res))
  .catch(err => console.log(err));

// async with fetch
async function getUsers() {
  // await response of the fetch call
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  // only proceed once it's resolved
  const data = await response.json();

  // only proceed once second promise is resolved
  return data;
}

getUsers().then(users => console.log(users));
```
