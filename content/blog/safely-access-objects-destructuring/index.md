---
title: Safely access nested object with ES6 Destructuring
date: "2020-01-13"
description: "Safely access nested object with ES6 Destructuring"
---

This is my first post on my blog about frot-end technologies and javascript!

I will start with basic but very useful topic. How can we use ES6 Destructuring to access values from nested object or array without using safe gaurd with `&&` operators.

Let's start with basic example of destructuring. This is how we can destructure values from object and assign them to variables.
We can also rename variable to different name and give default value ie. if object doesn't have that key(this is important for our topic)

```javascript
  const data = {
    id: '123',
    value: 'someValue'
  };

  // access id and value from data with destructuring 
  const { id , value } = data;
```

Now let's try to access nested object.

```javascript
  const data = {
    user: {
      id: 1,
      name: {
        first: 'Amit',
        last: 'Chauhan'
      }
    }
  };
```

If we want to safely read firstName from this data this is how we would write without destructuring

```javascript
  const firstName = data && data.user && data.user.name && data.user.name.first;
```

Let's do it with destructuring.

```javascript
  const {
    user: {
      name: {
        first: firstName // rename variable to firstName
      } = {} // this part is where we give default value to empty object so code doesn't break
    } = {} 
  } = data;
  console.log(firstName); // Amit
```

We can use destructuring to access array as well.

```javascript
  const dataArray = [{
    name: {
      first: 'Amit'
    }
  }];

  const [{
    name: {
      first: firstName
    } = {}
  } = {}] = dataArray;
  console.log(firstName); // Amit
```


Bonus tip

We can use destructuring to swap variables.

```javascript
let a = 10;
let b = 20;

[a, b] = [b, a];
console.log({ a, b }); // { a: 20, b: 10 }
```