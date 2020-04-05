const User = require('../models/user');
const passport = require('passport');

module.exports = {
    //POST /register
    async postRegister(req, res, next) {
        // res.send('POST REGISTER');
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          image: req.body.image
        });

        // User.register(newUser, req.body.password, (err) => 
        // {
        //   if (err) {
        //     console.log('error while user register!', err);
        //     return next(err);
        //   }
      
        //   console.log('user registered!');
      
        //   res.redirect('/');
        // });


        //look for errors with a try and catch but it is not really efficient
        // try {
        // await User.register(newUser, req.body.password);  //put async keyword before the register function
        // } catch (err) {
        //   return next(err);
        // }
        // res.redirect('/');


        //and this is the method that I should use (clean and more useful later)
        //we need the index.js file as a middleware
        await User.register(newUser, req.body.password);  
        res.redirect('/');
    },

    // POST /login
    postLogin (req, res, next) {
      //passport does not know that it needs to be invoked so it needs to have passed (req, res, next)
      //So -> has access to the objects and it is being invoked
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
      })(req, res, next);
    },

    //GET /logout
    getLogout (req, res, next) {
        req.logout();
        res.redirect('/');
      }
    }
