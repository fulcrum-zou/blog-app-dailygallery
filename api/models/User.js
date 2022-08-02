const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    aboutPic: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "May the Force be with you!",
    },
    github: {
      type: String,
      default: "https://github.com/",
    },
    linkedin: {
      type: String,
      default: "https://www.linkedin.com/",
    },
    facebook: {
      type: String,
      default: "https://www.facebook.com/",
    },
    twitter: {
      type: String,
      default: "https://twitter.com/",
    },
    instagram: {
      type: String,
      default: "https://www.instagram.com/",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
