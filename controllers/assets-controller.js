const express = require("express");
const Assets = require("../models/assets-model");

/**
 * Creates a new asset
 *
 * @param {*} type
 */
const create = (type) => {
  Assets.findAll();
};

module.exports = {
  create,
};
