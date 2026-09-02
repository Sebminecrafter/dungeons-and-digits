import { Sprite } from "/static/js/classes.js";

export function player() {
  return new Sprite(
    "/static/img/sprites/slatey_mcslateface.png", // src for img
    64, // width
    64, // height
    0, // x
    0, // y
    10, // frame count
    4, // animation
    4, // rows
    3, // columns
  );
}

export function add_knight() {
  return new Sprite(
    "/static/img/sprites/add_knight.png", // src for img
    96, // width
    96, // height
    0, // x
    0, // y
    5, // frame count
    0, // animation
    3, // rows
    2, // columns
  );
}

export function add_rat_overworld() {
  return new Sprite(
    "/static/img/sprites/add_rat_overworld.png", // src for img
    32, // width
    32, // height
    0, // x
    0, // y
    7, // frame count
    0, // animation
    3, // rows
    3, // columns
  );
}

export function basic_addition_guard() {
  return new Sprite(
    "/static/img/sprites/basic_addition_guard.png", // src for img
    128, // width
    128, // height
    0, // x
    0, // y
    3, // frame count
    0, // animation
    2, // rows
    2, // columns
  );
}

export function basic_addition() {
  return new Sprite(
    "/static/img/sprites/basic_addition.png", // src for img
    128, // width
    128, // height
    0, // x
    0, // y
    4, // frame count
    0, // animation
    2, // rows
    2, // columns
  );
}

export function not_so_basic_addition() {
  return new Sprite(
    "/static/img/sprites/not_so_basic_addition.png", // src for img
    256, // width
    256, // height
    0, // x
    0, // y
    12, // frame count
    0, // animation
    4, // rows
    3, // columns
  );
}

export default {
  player,
  add_knight,
  add_rat_overworld,
  basic_addition,
  basic_addition_guard,
  not_so_basic_addition,
};
