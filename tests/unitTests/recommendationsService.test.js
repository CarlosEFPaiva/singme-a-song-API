/* eslint-disable no-undef */

import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as songsRepository from '../../src/repositories/songsRepository.js';

const sut = recommendationsService;
describe('Unit tests for songsRepository.js', () => {
    describe('createNewRecommendation function', () => {
        it('should return songsRepository.addNewSong', async () => {
            jest.spyOn(songsRepository, 'addNewSong').mockImplementationOnce(({ name, youtubeLink }) => `${name} and ${youtubeLink}`);
            const result = await sut.createNewRecommendation({ name: 'nameTest', youtubeLink: 'linkTest' });

            expect(result).toEqual('nameTest and linkTest');
        });
    });

    describe('saveVote function', () => {
        it('should return songsRepository.addVote for addScore = 1', async () => {
            jest.spyOn(songsRepository, 'addVote').mockImplementationOnce(({ addToScore }) => addToScore);
            const result = await sut.saveVote({ id: 18, vote: 'UPvote' });

            expect(result).toEqual(1);
        });

        it('should return songsRepository.addVote for addScore = -1', async () => {
            jest.spyOn(songsRepository, 'addVote').mockImplementationOnce(({ addToScore }) => addToScore);
            const result = await sut.saveVote({ id: 18, vote: 'downVote' });

            expect(result).toEqual(-1);
        });
    });

    describe('getRandomSongs function', () => {
        it('should return songsRepository.getSongs for minScore = -5 maxScore = 10 and random = true', async () => {
            jest.spyOn(songsRepository, 'getSongs')
                .mockImplementationOnce(({ minScore, maxScore, random }) => `${minScore} and ${maxScore} and ${random}`);
            jest.spyOn(Math, 'random').mockImplementationOnce(() => 0);
            const result = await sut.getRandomSongs();

            expect(result).toEqual('-5 and 10 and true');
        });

        it('should return songsRepository.getSongs for minScore = -5 maxScore = 10 and random = true', async () => {
            jest.spyOn(songsRepository, 'getSongs')
                .mockImplementationOnce(({ minScore, maxScore, random }) => `${minScore} and ${maxScore} and ${random}`);
            jest.spyOn(Math, 'random').mockImplementationOnce(() => 0.29999);
            const result = await sut.getRandomSongs();

            expect(result).toEqual('-5 and 10 and true');
        });

        it('should return songsRepository.getSongs for minScore = 11 maxScore = undefined and random = true', async () => {
            jest.spyOn(songsRepository, 'getSongs')
                .mockImplementationOnce(({ minScore, maxScore, random }) => `${minScore} and ${maxScore} and ${random}`);
            jest.spyOn(Math, 'random').mockImplementationOnce(() => 0.3);
            const result = await sut.getRandomSongs();

            expect(result).toEqual('11 and undefined and true');
        });

        it('should return songsRepository.getSongs for minScore = 11 maxScore = undefined and random = true', async () => {
            jest.spyOn(songsRepository, 'getSongs')
                .mockImplementationOnce(({ minScore, maxScore, random }) => `${minScore} and ${maxScore} and ${random}`);
            jest.spyOn(Math, 'random').mockImplementationOnce(() => 0.99999);
            const result = await sut.getRandomSongs();

            expect(result).toEqual('11 and undefined and true');
        });
    });

    describe('getTopSongs function', () => {
        it('should return songsRepository.getSongs for limit = given amount', async () => {
            jest.spyOn(songsRepository, 'getSongs').mockImplementationOnce(({ limit }) => limit);
            const result = await sut.getTopSongs(1);

            expect(result).toEqual(1);
        });

        it('should return songsRepository.getSongs for limit = given amount', async () => {
            jest.spyOn(songsRepository, 'getSongs').mockImplementationOnce(({ limit }) => limit);
            const result = await sut.getTopSongs(5);

            expect(result).toEqual(5);
        });
    });
});
