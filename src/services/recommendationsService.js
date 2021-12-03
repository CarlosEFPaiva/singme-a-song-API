import * as songsRepository from '../repositories/songsRepository.js';

async function createNewRecommendation({ name, youtubeLink }) {
    return songsRepository.addNewSong({ name, youtubeLink });
}

async function saveVote({ id, vote }) {
    const addToScore = (vote.toLowerCase() === 'upvote' ? 1 : -1);
    return songsRepository.addVote({ id, addToScore, deleteIfLowScore: true, mininumScore: -5 });
}

async function getRandomSongs() {
    const randomNumber = Math.random() * 100;
    let minScore;
    let maxScore;
    if (randomNumber < 30) {
        minScore = -5;
        maxScore = 10;
    } else {
        minScore = 11;
    }
    return songsRepository.getSongs({ minScore, maxScore, random: true });
}

async function getTopSongs(amount) {
    return songsRepository.getSongs({ limit: amount });
}

export {
    createNewRecommendation,
    saveVote,
    getRandomSongs,
    getTopSongs,
};
