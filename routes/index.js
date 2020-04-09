const express = require('express');
const router = express.Router();
//NAME OF THE METHOD THAT WE NEED FROM THAT OBJECT
//when we require the controller index, it exports the object so we require it 
//we can pull any of the keys from that object
//one key is for the register which is a function (in this case)
//////////////////SOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//we destructure the object that we require from the controller index and we extract post register 
//-->puth inside of a variable
const {
  postRegister, postLogin, getLogout
} = require('../controllers/index');
//I pull the asyncErrorHandler out of the object that we require from the miggleware index.js
const {
  asyncErrorHandler
} = require('../middleware/index');


//this is the original verson, without destructuring
// const indexObj = require('../controllers/index');
// const postRegister = indexObj.postRegister;


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Surfing - Shop --> Home page'
  });
});

/* GET /register */
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});


/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST /login */
router.post('/login', postLogin);

/* GET /logout */
router.get('/logout', getLogout);

/* GET /profile */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile');
})

/* PUT /profile/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
})

/* GET /forgot */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot');
})

/* PUT /forgot */
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot');
})

/* GET /reset/:token */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset/:token');
})

/* PUT /reset/:token */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset/:token');
})

module.exports = router;