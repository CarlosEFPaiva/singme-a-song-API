import connection from '../database/database.js';

async function addNewSong({ name, youtubeLink }) {
    const newSong = await connection.query(`
    INSERT INTO songs
        (name, youtube_link)
    VALUES
        ($1, $2)
    ON CONFLICT DO NOTHING
    ;`, [name, youtubeLink]);
    return newSong.rowCount;
}

async function addVote({ id, addToScore, deleteIfLowScore, mininumScore }) {
    const addedVote = (await connection.query(`
    UPDATE songs
    SET score = score + $1
    WHERE id = $2
    RETURNING *
    ;`, [addToScore, id])).rows[0];
    if (!!addedVote && deleteIfLowScore && addedVote.score < mininumScore) {
        await connection.query('DELETE FROM songs WHERE id = $1', [id]);
    }
    return addedVote;
}

async function getRandomSongs({ minScore, maxScore }) {
    const mainQueryText = `
        SELECT *
        FROM songs
        WHERE 1 = 1
    `;
    const firstQueryParams = [];
    let firstQueryText = mainQueryText;

    if (minScore) {
        firstQueryParams.push(minScore);
        firstQueryText += ` AND score >= $${firstQueryParams.length}`;
    }

    if (maxScore) {
        firstQueryParams.push(maxScore);
        firstQueryText += ` AND score <= $${firstQueryParams.length}`;
    }
    let songs = (await connection.query(`${firstQueryText};`, firstQueryParams)).rows;

    if (!songs.length) {
        songs = (await connection.query(`${mainQueryText};`)).rows;
    }
    return songs;
}

export {
    addNewSong,
    addVote,
    getRandomSongs,
};
