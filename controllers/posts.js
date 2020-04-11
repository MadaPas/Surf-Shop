const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'madapas',
    api_key: '432985464553714',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    //Posts Index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', {
            posts
        });
    },
    //Posts new
    postNew(req, res, next) {
        res.render('posts/new');
    },

    //Posts Create
    async postCreate(req, res, next) {
        req.body.post.images = [];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }


        // use req.body to create new post 
        let post = await Post.create(req.body.post);
        // plug in the id of the new created post
        res.redirect(`/posts/${post.id}`);
    },

    //Posts show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', {
            post
        });
    },

    //Posts edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {
            post
        });
    },

    //Posts update
    async postUpdate(req, res, next) {
        // find the post by id
        //here we have access to the post that we want to do editing on 
        let post = await Post.findById(req.params.id);
        // check if there are any images for deletion
        if (req.body.deleteImages && req.body.deleteImages.length) {
            // assign deleteImages from req.body to its own variable
            let deleteImages = req.body.deleteImages;
            // loop over deleteImages
            for (const public_id of deleteImages) {
                // delete images from Cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete an image from post.images
                for (const image of post.images) {
                    if (image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }

        // check if there are any new images for upload
        if (req.files) {
            // upload images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add images to post .images array

                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }

        }
        // update the post with any new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.location = req.body.post.location;

        // save the updated post into the DB
        post.save();

        // redirect to show page
        res.redirect(`/posts/${post.id}`);
    },

    //Posts delete
    async postDelete(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }

}