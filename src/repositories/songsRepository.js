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

export {
    addNewSong,
};
