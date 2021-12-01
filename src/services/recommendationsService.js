import * as songsRepository from '../repositories/songsRepository.js';

async function createNewRecommendation({ name, youtubeLink }) {
    return songsRepository.addNewSong({ name, youtubeLink });
}

export {
    createNewRecommendation,
};
