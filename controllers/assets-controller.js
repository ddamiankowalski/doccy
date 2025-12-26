const express = require("express");
const Assets = require("../models/assets-model");

const create = (type) => {
  Assets.findAll();
};

module.exports = {
  create,
};
