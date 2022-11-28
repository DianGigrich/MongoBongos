
const router = require('express').Router();
const { Thoughts, User } = require('../../models');

router.get('/', (req, res) => {
    Thoughts.find()
        .then(thoughts => res.json(thoughts))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

router.get('/:thoughtId', (req, res) => {
    Thoughts.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
})

router.post('/', (req, res) => {
    console.log(req.body);
    Thoughts.create(req.body)
        .then(thought => {
            User.findByIdAndUpdate(req.body.userId,
                {
                    $addToSet: { thoughts: thought._id }
                },
                { new: true })
                .then((user) =>
                    !user
                        ? res.status(404).json({ message: 'No thoughts with that ID' })
                        : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
        })
})

router.put('/:thoughtId', (req, res) => {
    Thoughts.findByIdAndUpdate(req.params.thoughtId, {
        $addToSet: { thoughts: req.body }
    }, { new: true })
        .then(thought => !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(project)
        )
        .catch((err) => res.status(500).json(err));
})


router.delete('/:thoughtId/:userId', (req, res) => {
    Thoughts.findByIdAndDelete(req.params.thoughtId)
        .then(thought => {
            !thought ? res.status(404).json({ message: 'No thoughts with that ID' }) : User.findByIdAndUpdate(req.params.userId, {
                $pull: { thoughts: req.params.thoughtId }
            }, { new: true })
                .then(user => !user
                    ? res.status(404).json({ message: 'No thoughts with that ID' })
                    : res.json(user))
        })
})

// add reaction
router.post('/:thoughtId/reactions', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thoughts) =>
            !thoughts
                ? res
                    .status(404)
                    .json({ message: 'No thoughts found with that ID :(' })
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
}
)

// delete reaction
router.delete('/:thoughtId/reactions', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((thoughts) =>
            !thoughts
                ? res
                    .status(404)
                    .json({ message: 'No thoughts found with that ID :(' })
                : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
});


module.exports = router;