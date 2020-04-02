const express = require('express');
const router = express.Router({mergeParams: true});
//configuration object
//we have access to the post id


/* GET reviews index  /posts/:id/reviews */
router.get('/', (req, res, next) => {
    res.send('INDEX /posts/:id/reviews');
  });

/////////////////we don't need this route cuz we don't need to go anywhere to see a new form
//we just go to the post show page and the new form for review will be there

//   /* GET reviews new  /posts/:id/reviews/new */
// router.get('/new', (req, res, next) => {
//   res.send('NEW /reviews/new');
// });

/* review reviews create  /posts/:id/reviews */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/reviews');
});


/////////////////same as we don't need this
//its gonna be with the list of others review on the show page
//the reviews will be visible on the show page for the post that they belong to and it's same for the form up

// /* GET reviews show  /posts/:id/reviews/:review_id */   //can't use id cuz posts is using so I have to rename 
// router.get('/:review_id', (req, res, next) => {
//   res.send('SHOW /reviews/:id');
// });

/* GET reviews edit  /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/reviews/:id/edit');
});

/* PUT reviews update  /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /posts/:id/reviews/:id');
});

/* DELETE reviews destroy  /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /posts/:id/reviews:/review_id');
});
  
  module.exports = router;