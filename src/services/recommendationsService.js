import * as songsRepository from '../repositories/songsRepository.js';

async function createNewRecommendation({ name, youtubeLink }) {
    return songsRepository.addNewSong({ name, youtubeLink });
}

async function saveVote({ id, vote }) {
    const addToScore = (vote === 'upvote' ? 1 : -1);
    return songsRepository.addVote({ id, addToScore, deleteIfLowScore: true, mininumScore: -5 });
}

export {
    createNewRecommendation,
    saveVote,
};
