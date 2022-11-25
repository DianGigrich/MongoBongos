const connection = require('../config/connection');

const { User, Project } = require('../models')
const { getRandomYarn } = require('./data');

// TODO: UPDATE INFO
const projectData = [
    {
        name: 'Blanket',
        hook: '5mm',
        description: 'cozy'
    },
    {
        name: 'Sweater',
        hook: '7.5mm',
        description: 'cozy'
    }, {
        name: 'Beanie',
        hook: 'H',
        description: 'cozy'
    }, {
        name: 'Basket',
        hook: '8mm',
        description: 'cozy'
    },
]


connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    await Project.deleteMany({})

    const projects = []

    projectData.forEach(project => {
        const yarns = getRandomYarn(3);
        project.yarns = yarns;
        projects.push(project)
    })



    await Project.collection.insertMany(projects)

    await User.collection.insertOne({
        username: 'lindsfitz',
        projects: [...projects.map(project => project._id)]
    })



    // Log out the seed data to indicate what should appear in the database
    console.table(projects);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});