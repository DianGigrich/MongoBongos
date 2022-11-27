
// TODO: update user routes

const router = require('express').Router();
const { User, Thoughts } = require('../../models');


router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .populate({ path: 'thoughts' }, { path: 'friends' })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
})

// create new user
router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

// delete user
router.delete('/:userId', (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
        )
        .catch((err) => res.status(500).json(err));
})

//  Add friend to user
router.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friend: req.body } },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
}
)

// Remove friend from user
router.delete('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

module.exports = router;