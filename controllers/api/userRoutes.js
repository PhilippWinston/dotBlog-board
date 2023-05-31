const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    // newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    req.session.save((error) => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
debugger
res.status(200).json(userData);
});
  } catch (err) {
    debugger
    res.status(400).json(err);
  }
});

// user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username }});
    
debugger
    if (!userData) {
      debugger
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    debugger
    const {username, id} = userData
    const user = {username, id}

    if (!validPassword) {
      debugger
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save((error) => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.loggedin = true;

debugger
      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    const error = {message: 'something went wrong :('}
    debugger
    res.status(400).json(error);
  }
});

//user logout
router.post('/logout', (req, res) => {
if (req.session.logged_in) {
  req.session.destroy(() => {
    res.status(204).end();
  });
} else {
  res.status(404).end();
}
});

module.exports = router;