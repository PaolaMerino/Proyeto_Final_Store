import mongoose from "mongoose";
import {
  expiresInOneDay,
  expiresInOneWeek,
  ERROR_MESSAGES,
} from "../config/constants.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const login = async (data) => {
  const { email, password } = data;

  let user = await User.findOne({ email }, "-__v -setPasswordToken");

  if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

  if (user.blockedAt || !user.password)
    throw new Error(ERROR_MESSAGES.ACCESS_DENIED);

  const passwordAnswer = await user.comparePassword(password);
  if (!passwordAnswer) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);

  const { token, expiresIn: tokenExpiresIn } = generateToken({
    identifier: user._id,
    expiresIn: expiresInOneDay,
    secret: "JWT_SECRET",
  });
  const { token: refreshToken, expiresIn: refreshTokenExpiresIn } =
    generateToken({
      identifier: user._id,
      expiresIn: expiresInOneWeek,
      secret: "JWT_REFRESH",
    });

  return {
    token,
    refreshToken,
    tokenExpiresIn,
    refreshTokenExpiresIn,
    userId: user._id,
  };
};

export const signUpService = async (data) => {
  const { email, password, name } = data;

  let user = await User.findOne({ email }, "-__v -setPasswordToken");

  if (user) throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);

  let newUser = new User({ name, email, password });
  await newUser.save();

  return { user: newUser, message: "User created successfully" };
};

export const refreshToken = async (data) => {
  const refreshToken = data.refreshToken;
  if (!refreshToken) throw new Error("Token does not exists");

  const { identifier } = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESHTOKEN_SECRET
  );

  let user = await User.findById(identifier);
  if (!user) throw new Error("No user");

  const { token, expiresIn: tokenExpiresIn } = generateToken({
    identifier: user._id,
    expiresIn: expiresInOneDay,
    secret: "JWT_SECRET",
  });
  const { token: newRefreshToken, expiresIn: refreshTokenExpiresIn } =
    generateToken({
      identifier: user._id,
      expiresIn: expiresInOneWeek,
      secret: "JWT_REFRESH",
    });

  return {
    token,
    refreshToken: newRefreshToken,
    tokenExpiresIn,
    refreshTokenExpiresIn,
  };
};

export const findAllService = async () => {
  const users = await User.find({}, "-__v -setPasswordToken -password")
    .sort({ createdAt: -1 })
    .lean();

  console.log(users);

  if (!users) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return users;
};

export const findByIdService = async (userId) => {
  const user = await User.findById(
    userId,
    "-__v -setPasswordToken -password"
  ).populate("cart.productId");
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  return user;
};

export const addToCartService = async (userId, productId, quantity = 1) => {
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    throw new Error("Invalid userId or productId");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const existingItem = user.cart.find((item) =>
    item.productId.equals(productId)
  );

  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    user.cart.push({ productId, quantity });
  }

  (await user.save()).populate("cart.productId");
  return user.cart;
};

export const removeFromCartService = async (userId, productId) => {
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    throw new Error("Invalid userId or productId");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  user.cart = user.cart.filter((item) => !item.productId.equals(productId));

  await user.save();
  return user.cart;
};

export const clearCartService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  user.cart = [];

  await user.save();
  return user.cart;
};
