const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Posts,
    Comment
} = require('../models');


router.get('/', (req, res) => {
    debugger
    Posts.findAll({
            attributes: [
                'id',
                'title',
                'PostsBody',
                'date_created'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'Posts_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostsData => {
            const Posts = dbPostsData.map(Post => Post.get({
                plain: true
            }));
debugger
            res.render('homepage', {
                Posts,
                loggedIn: req.session.logged_in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/Posts/:id', (req, res) => {
    Posts.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'PostsBody',
                'date_created'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'Posts_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({
                    message: 'No Posts found with this id'
                });
                return;
            }

            const Posts = dbPostsData.get({
                plain: true
            });
console.log(Posts)
            res.render('single-post', {
                Posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});


router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
    // res.redirect('/');
})


module.exports = router;