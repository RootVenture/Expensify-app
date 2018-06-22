const promise = new Promise((resolve, reject) => {
  resolve('This is resolved');
});

promise.then(data => {
  console.log(data);
});
