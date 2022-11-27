const connection = require('../config/connection');

const { User, Thoughts } = require('../models')
const { getRandomReaction } = require('./data');

const thoughtData = [
    {
        thoughtText: 'Blanket',
        username: 'Dian'
    },
    {
        thoughtText: 'Another thought here',
        username: 'Dian'
    }, 
    {
        thoughtText: 'This is a great thought. It is about cats.',
        username: 'Dian'
    }, 
    {
        thoughtText: 'This thought is about hamsters and how cute they are!',
        username: 'Dian'
    },
]


connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    await Thoughts.deleteMany({})

    const thoughts = []

    thoughtData.forEach(thought => {
        const reactions = getRandomReaction(3);
        thought.reactions = reactions;
        thoughts.push(thought)
    })



    await Thoughts.collection.insertMany(thoughts)

    await User.collection.insertOne({
        username: 'DianS',
        email: "dian@diansemail.com",
        thoughts: [...thoughts.map(thought => thought._id)]
    });



    // Log out the seed data to indicate what should appear in the database
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});