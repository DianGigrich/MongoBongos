
// TODO: UPDATE PROJECT

const router = require('express').Router();
const { Project, User } = require('../../models');

router.get('/', (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})


router.get('/:projectId', (req, res) => {
    Project.findOne({ _id: req.params.projectId })
        .then((project) =>
            !project
                ? res.status(404).json({ message: 'No project with that ID' })
                : res.json(project)
        )
        .catch((err) => res.status(500).json(err));
})

router.post('/', (req, res) => {
    console.log(req.body);
    Project.create(req.body)
        .then(project => {
            // User.findOne({ _id: req.body.userId })
            User.findByIdAndUpdate(req.body.userId,
                {
                    $addToSet: { projects: project._id }
                },
                { new: true })
                .then((user) =>
                    !user
                        ? res.status(404).json({ message: 'No user with that ID, but project was created' })
                        : res.json(project)

                )
                .catch((err) => res.status(500).json(err));
        })
})

router.put('/:projectId', (req, res) => {
    Project.findByIdAndUpdate(req.params.projectId, {
        $addToSet: { yarns: req.body }
    }, { new: true })
        .then(project => !project
            ? res.status(404).json({ message: 'No project with that ID, but project was created' })
            : res.json(project)
        )
        .catch((err) => res.status(500).json(err));
})

router.delete('/:projectId/:userId', (req, res) => {
    Project.findByIdAndDelete(req.params.projectId)
        .then(project => {
            !project ? res.status(404).json({ message: 'No project with that ID' }) : User.findByIdAndUpdate(req.params.userId, {
                $pull: { projects: req.params.projectId }
            }, { new: true })
                .then(user => !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user))
        })
})

module.exports = router;