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

function getConditionedQuery({ mainQueryText, minScore, maxScore, limit, random }) {
    const queryParams = [];
    let conditionedQueryText = mainQueryText;
    if (minScore) {
        queryParams.push(minScore);
        conditionedQueryText += ` AND score >= $${queryParams.length}`;
    }
    if (maxScore) {
        queryParams.push(maxScore);
        conditionedQueryText += ` AND score <= $${queryParams.length}`;
    }
    if (random) {
        conditionedQueryText += ' ORDER BY RANDOM()';
    } else {
        conditionedQueryText += ' ORDER BY score DESC';
    }
    if (limit) {
        queryParams.push(limit);
        conditionedQueryText += ` LIMIT $${queryParams.length}`;
    }
    return { conditionedQueryText, queryParams };
}

async function getSongs({ minScore, maxScore, limit, random }) {
    const mainQueryText = `
        SELECT *
        FROM songs
        WHERE 1 = 1
    `;

    const {
        conditionedQueryText,
        queryParams,
    } = getConditionedQuery({ mainQueryText, minScore, maxScore, limit, random });

    let songs = (await connection.query(`${conditionedQueryText};`, queryParams)).rows;

    if (!songs.length) {
        songs = (await connection.query(`${mainQueryText};`)).rows;
    }
    return songs;
}

export {
    addNewSong,
    addVote,
    getSongs,
};
