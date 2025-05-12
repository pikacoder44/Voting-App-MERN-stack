const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  cnic: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const person = this;

  //Hash only when it is new or modified
  if (!person.isModified("password")) return next();

  try {
    //Generating Salt:

    const salt = await bcrypt.genSalt(10);

    //hash password:
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //Overwrite Plained pass to Hashed one
    person.password = hashedPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

//   Compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use Bcrypt to compare the provided password with hashed pass:
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
