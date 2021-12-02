import * as isValid from '../utils/externalLibs/validation.js';
import * as recommendationsService from '../services/recommendationsService.js';

async function createNewRecommendation(req, res) {
    const { name, youtubeLink } = req.body;
    if (!isValid.newRecommendation({ name, youtubeLink })) {
        return res.status(400).send('Error with inputs validation');
    }
    try {
        const newSong = await recommendationsService.createNewRecommendation({ name, youtubeLink });
        if (!newSong) return res.status(409).send('This recommendation already exists');
        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function evaluateRecommendation(req, res) {
    const { id, vote } = req.params;
    if (!isValid.newVote({ id, vote })) {
        return res.status(400).send('Error with inputs validation');
    }
    try {
        const addedVote = await recommendationsService.saveVote({ id, vote });
        if (!addedVote) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function getRandomSongs(req, res) {
    try {
        const songs = await recommendationsService.getRandomSongs();
        if (!songs.length) {
            return res.sendStatus(404);
        }
        return res.send(songs);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function getTopSongs(req, res) {
    const { amount } = req.params;
    if (!isValid.amount(amount)) {
        return res.status(400).send('Error with inputs validation');
    }
    try {
        const songs = await recommendationsService.getTopSongs(amount);
        if (!songs.length) {
            return res.sendStatus(404);
        }
        return res.send(songs);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export {
    createNewRecommendation,
    evaluateRecommendation,
    getRandomSongs,
    getTopSongs,
};
