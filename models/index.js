const User = require('./user');
const Posts = require('./post');
const Comment = require('./comment');


User.hasMany(Posts, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Posts.belongsTo(User, {
    foreignKey: 'user_id'
})

Posts.hasMany(Comment, {
    foreignKey: 'Posts_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Posts, {
    foreignKey: 'Posts_id'
})


module.exports = {
    User,
    Posts,
    Comment
};