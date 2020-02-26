# JavaScript Patterns

## What are Patterns?

- A re-usable solution that can be applied to occuring problems in software design (JavaScript Applications)
- Can also be thought of as programming templates
- Situations vary significantly

I captured a lot of the code from Brad's examples below, but didn't really absorb this fully on the first pass. Here are some more resources to revisit as time allows. They are in no particular order.

https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns

https://github.com/javascript-patterns/javascript-patterns

https://github.com/tcorral/Design-Patterns-in-Javascript

https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know

https://addyosmani.com/resources/essentialjsdesignpatterns/book/

https://seesparkbox.com/foundry/javascript_design_patterns (look at other resource here as well)

## Module & Revealing Module Patterns

#### Module Pattern

```js
//Basic Structure
(function() {
  // Declare private vars and functions

  return {
    // Declare public vars and functions
  };
})();

// Example
const UICtrl = (function() {
  let text = 'Hello World';

  const changeText = function() {
    const element = document.querySelector('h1');
    element.textContent = text;
  };

  return {
    callChangeText: function() {
      changeText();
      console.log(text);
    }
  };
})();

UICtrl.callChangeText(); // will change h1 and console.log text

UICtrl.text; // undefined

UICtrl.changeText(); // TypeError: UICtrl.changeText is not a function
```

#### Revealing Module Pattern

```js
const ItemCtrl = (function() {
  // Can prefix with underscore for private vars as convention
  let _data = [];

  function add(item) {
    _data.push(item);
    console.log('Item Added...');
  }

  function get(id) {
    return data.find(item => {
      return item.id === id;
    });
  }

  return {
    add,
    get
  };
})();

ItemCtrl.add({ id: 1, name: 'John' }); // 'Item Added...'

ItemCtrl.get(1); // { id: 1, name: 'John' }

ItemCtrl._data; // undefined
```

## Singleton Pattern

- Manifestation of the Module Pattern
- A Singleton object is an immediately anonymous function, and it can only return one instance of an object at a time
- Repated calls to the constructor will return the same instance

```js
const Singletone = (function() {
  let instance;

  function createInstance() {
    const object = new Object({ name: 'Joey' });
    return object;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

console.log(instanceA); // { name: "Joey" }
console.log(instanceA === instanceB); // true
```

## Factory Pattern

```js
function MemberFactory() {
  this.createMember = function(name, type) {
    let member;

    switch (type) {
      case 'simple':
        member = new SimpleMembership(name);
        break;
      case 'standard':
        member = new StandardMembership(name);
        break;
      case 'super':
        member = new SuperMembership(name);
        break;
    }

    member.type = type;

    member.define = function() {
      console.log(`${this.name} (${this.type}: ${this.cost})`);
    };

    return member;
  };
}

const SimpleMembership = function(name) {
  this.name = name;
  this.cost = '$5';
};

const StandardMembership = function(name) {
  this.name = name;
  this.cost = '$15';
};
const SuperMembership = function(name) {
  this.name = name;
  this.cost = '$25';
};

const members = [];
const factory = new MemberFactory();

members.push(factory.createMember('Joey', 'simple'));

members.forEach(member => member.define()); // 'Joey (simple: $5)'
```

## Observer Pattern

You can subscribe and unsubscribe from certain methods.

#### ES5 Prototype Example

```js
function EventObserver() {
  this.observers = [];
}

EventObserver.prototype = {
  subscribe: function(fn) {
    this.observers.push(fn);
    console.log(`You are subscribed to ${fn.name}`);
  },

  unsubscribe: function(fn) {
    this.observers = this.observers.filter(function(item) {
      if (item !== fn) {
        return item;
      }
      console.log(`You are unsubscribed from ${fn.name}`);
    });
  },

  fire: function() {
    this.observers.forEach(function(item) {
      item.call();
    });
  }
};

const click = new EventObserver();

// Event listeners - pretend they're real...
document.querySelector('.sub-ms').addEventListener('click', function() {
  click.subscribe(getCurMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function() {
  click.unsubscribe(getCurMilliseconds);
});

document.querySelector('.sub-s').addEventListener('click', function() {
  click.subscribe(getSeconds);
});

document.querySelector('.unsub-s').addEventListener('click', function() {
  click.unsubscribe(getSeconds);
});

document.querySelector('.fire').addEventListener('click', function() {
  click.fire();
});

// Click handler
const getCurMilliseconds = function() {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};

const getCurSeconds = function() {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};
```

#### ES6 Example

```js
class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
    console.log(`You are subscribed to ${fn.name}`);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(item => item !== fn);
    console.log(`You are unsubscribed from ${fn.name}`);
  }

  fire() {
    this.observers.forEach(item => item.call());
  }
}

const click = new EventObserver();

// Event listeners - pretend they're real...
document.querySelector('.sub-ms').addEventListener('click', function() {
  click.subscribe(getCurMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function() {
  click.unsubscribe(getCurMilliseconds);
});

document.querySelector('.sub-s').addEventListener('click', function() {
  click.subscribe(getSeconds);
});

document.querySelector('.unsub-s').addEventListener('click', function() {
  click.unsubscribe(getSeconds);
});

document.querySelector('.fire').addEventListener('click', function() {
  click.fire();
});

// Click handler
const getCurMilliseconds = function() {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};

const getCurSeconds = function() {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};
```

## Mediator Pattern

```js
const User = function(name) {
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function(msg, to) {
    this.chatroom.send(msg, this, to);
  },
  receive: function(msg, from) {
    console.log(`${from.name} to ${this.name}: ${msg}`);
  }
};

const Chatroom = function() {
  let users = {};

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(msg, from, to) {
      if (to) {
        // Single user message
        to.receive(msg, from);
      } else {
        // Mass message
        for (const user in users) {
          if (users[user] !== from) {
            users[user].receive(msg, from);
          }
        }
      }
    }
  };
};

const joey = new User('Joey');
const jon = new User('Jon');
const katie = new User('Katie');

const chatroom = new Chatroom();

chatroom.register(joey);
chatroom.register(jon);
chatroom.register(katie);

joey.send('Hi jon', jon);
```

## State Pattern

```js
const PageState = function() {
  let currentState = new homeState(this);

  this.init = function() {
    this.change(new homeState());
  };

  this.change = function(state) {
    currentState = state;
  };
};

// Home state
const homeState = function(page) {
  document.querySelector('#heading').textContent = null;
  document.querySelector('#content').innerHTML = `
    <div class="jumbotron">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div>
  `;
};

// About state
const aboutState = function(page) {
  document.querySelector('#heading').textContent = 'About Us';
  document.querySelector('#content').innerHTML = `
    <p>This is the about page</p>
  `;
};

// Contact state
const contactState = function(page) {
  document.querySelector('#heading').textContent = 'Contact Us';
  document.querySelector('#content').innerHTML = `
    <form>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `;
};

// Instantiate page state
const page = new PageState();

// Init first state
page.init();

// UI Vars
const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

// Home
home.addEventListener('click', e => {
  page.change(new homeState());
  e.preventDefault();
});

// about
about.addEventListener('click', e => {
  page.change(new aboutState());
  e.preventDefault();
});

// Contact
contact.addEventListener('click', e => {
  page.change(new contactState());
  e.preventDefault();
});
```
