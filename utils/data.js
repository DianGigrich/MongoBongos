
// TODO: update info
const reaction = [{
    reactionBody: "So much reations!",
    username: "Dian",
},{
    reactionBody: "Another reaction!",
    username: "Dian",
},{
    reactionBody: "I dont know about this one.",
    username: "Dian",
}

]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];



const getRandomReaction = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(getRandomArrItem(reaction));
    }
    return results;
};


module.exports = { getRandomReaction }