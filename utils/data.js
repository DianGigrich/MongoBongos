
// TODO: update info
const yarn = [
    {
        material: 'Acrylic',
        weight: 'Medium #4',
        color: 'Beige',
        amount: 1
    }, {
        material: 'Cotton',
        weight: 'Light #3',
        color: 'Yellow',
        amount: 2
    }
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];



const getRandomYarn = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(getRandomArrItem(yarn));
    }
    return results;
};


module.exports = { getRandomYarn }