const express = require("express");
const router = express.Router();

const { signup, login, profile } = require("../controller/userCtrl");
const { create, readByCategory, update, remove } = require("../controller/taskCtrl");

// Debug API
router.get("/debug", (_, res) => {
  let data = "😍";
  return res.send({ data: data });
});

// User APIs ---
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile/:id", profile);
router.get("/edit/:id", profile);

// ToDo APIs ---
router.post("/create", create);
router.get("/read/:id/:category", readByCategory);
router.put("/update/:id/:category", update);
router.delete("/delete/:id", remove);

module.exports = router;

