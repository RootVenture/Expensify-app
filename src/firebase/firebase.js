import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// // database.ref('expenses').push({
// //   description: 'Food',
// //   notes: 'Delicious',
// //   amount: 1234,
// //   created: 0,
// // });

// // database.ref('expenses').push({
// //   description: 'Gum',
// //   notes: 'Bubble',
// //   amount: 2234,
// //   created: 110,
// // });

// // database.ref('expenses').push({
// //   description: 'Ice Cream',
// //   notes: 'Cold',
// //   amount: 512,
// //   created: 540,
// // });

// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = [];

//     snapshot.forEach(item => {
//       expenses.push({
//         id: item.key,
//         ...item.val,
//       });
//     });
//     console.log(expenses);
//   });

// database.ref('expenses').on('value', snapshot => {
//   console.log(snapshot.val());
// });

// database.ref('expenses').on('child_removed', snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', snapshot => {
//   console.log('child changed', snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', snapshot => {
//   console.log('child added', snapshot.key, snapshot.val());
// });
