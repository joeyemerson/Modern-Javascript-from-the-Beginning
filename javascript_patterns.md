# JavaScript Patterns

## What are Patterns?

- A re-usable solution that can be applied to occuring problems in software design (JavaScript Applications)
- Can also be thought of as programming templates
- Situations vary significantly

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

## State Pattern
