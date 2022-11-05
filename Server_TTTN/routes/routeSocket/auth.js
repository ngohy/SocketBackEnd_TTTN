const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getUsersById,
  registerAdmin,
  userAdmin
} = require("../../controllers/controllerSocket/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/admin/register", registerAdmin);
router.get("/admin/allusers", getAllUsers);
router.get("/userById/:id", getUsersById);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/userAdmin", userAdmin);

module.exports = router;
