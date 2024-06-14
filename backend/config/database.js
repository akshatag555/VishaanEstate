const mongoose = require("mongoose");
exports.connnectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((con) => console.log(`Database Connected:${con.connection.host}`))
    .catch((err) => console.log(err));
};
const testES6 = () => {
  return 'ES6 is supported!';
};

console.log(testES6());