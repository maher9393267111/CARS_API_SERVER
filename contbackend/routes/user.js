const express = require("express");
const {
  login,
  logout,
  getUser,
  myProfile,
  contact,
  updateUser,
  addTimeline,
  addYoutube,
  addProject,
  deleteTimeline,
  deleteYoutube,
  deleteProject,
  Register,
  hello,
} = require ("../controllers/user.js");
const { isAuthenticated } =  require("../middleware/auth.js");
const router = express.Router();



router.post('/login',login)
router.post('/logout',logout)

router.post('/register',Register)

router.get('/hello',isAuthenticated,hello)

// router("/logout").get(logout);

// router("/user").get(getUser);

// router("/me").get(isAuthenticated, myProfile);


// router("/admin/timeline/add").post(isAuthenticated, addTimeline);
// router("/admin/youtube/add").post(isAuthenticated, addYoutube);
// router("/admin/project/add").post(isAuthenticated, addProject);

// router("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
// router("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
// router("/admin/project/:id").delete(isAuthenticated, deleteProject);

// router("/contact").post(contact);



module.exports = router;