//
// Object Destructuring
//

const person = {
  // name: 'Ray',
  age: 123,
  location: {
    city: 'Boston',
    temp: 90,
  },
};

// console.log(`${person.name} is ${person.age}.`);
// set default fallback value
const { name: firstName = 'default', age } = person;
// const name = person.name;
// const age = person.age;
console.log(`${firstName} is ${age}.`);

// const { temp, city } = person.location;
// console.log(`It's ${temp} in ${city}`);

// rename the variable to temperature
const { city, temp: temperature } = person.location;
console.log(`It's ${temperature} in ${city}`);

const book = {
  title: 'A song of ice and fire',
  author: 'George RR Martin',
  publisher: {
    // name: 'O Reilly',
  },
};

const { name: publisherName = 'Self-Published' } = book.publisher;
console.log(publisherName);

//
// Array Destructuring
//

const address = ['123 fake street', 'Boston', 'Mass', '11345'];

const [, cities, state = 'Washington'] = address;
console.log(`You are in ${cities} ${state}`);

const item = ['Coffee', '$2.00', '$2.50', '$3.00'];

const [coffee, , med] = item;

console.log(`A medium ${coffee} costs ${med}`);
