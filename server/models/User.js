const MONGOOSE = require("mongoose");
const BCRYPT = require("bcrypt");

const userSchema = new MONGOOSE.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// use function instead of ()=>{} to avoid
// "this" keyword using inside point to context of User.js
// it must be point to which object call to save function.
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  BCRYPT.genSalt(10, (e, salt) => {
    if (e) {
      return next(e);
    }
    // the salt attribute will return if it don't catch any error
    // it's a random string of char use to prevent rainbow table attack.
    // the return value of salt will be passed to hash function.

    BCRYPT.hash(user.password, salt, (e, hash) => {
      if (e) {
        return next(e);
      }

      // hash function will be return a string of char
      // and it will be assigned to user.password if it has no error
      // this hash password will be shown in database
      // it will prevent the attacker see the real password
      // if by somehow , they can access to our database

      user.password = hash;
      next();
    });
  });
});

// once again use function instead of ()=>{}
// to avoid the point of "this" keyword
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  // use Promise instead of async await if you have to
  // handle exactly what will happen to that process.
  // Note: async await is very common
  // that it only can do is wait the process finish.
  
  return new Promise((resolve, reject) => {
    BCRYPT.compare(candidatePassword, user.password, (e, isMatch) => {
      if (e) {
        return reject(e);
      }
      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

MONGOOSE.model("User", userSchema);
