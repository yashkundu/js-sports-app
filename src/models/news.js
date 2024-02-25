const mysql = require('../lib/mysql');

const createNewsForMatchOrTour = async (params) => {
    const {title, description, matchId, tourId} = params

    const sql = `INSERT INTO news (title, description, ${matchId?'matchId':'tourId'}) VALUES (?, ?, ?)`;
    const values = [title, description, matchId || tourId]

    return await mysql.query(sql, values);
}

const getNewsForASport = async ({sportId}) => {
    let sql = 'select * from news where news.tourId in (select id from tours where tours.sportId = ?)'
    let values = [sportId]
    const p1 = mysql.query(sql, values)
    sql = `select news.title as title, news.description as description, news.id as id, news.matchId as matchId, news.tourId as tourId, news.createdAt as createdAt from 
    news inner join matches on news.matchId = matches.id 
    inner join tours on matches.tourId = tours.id
    inner join sports on tours.sportId = sports.id
    where sports.id = ?`
    values = [sportId]
    const p2 = mysql.query(sql, values)
    const res = await Promise.all([p1, p2])
    const finalRes = [].concat(...res)
    return finalRes
}

const getNewsForATour = async ({tourId}) => {
    const sql = 'select * from news where news.tourId = ? or news.matchId in (select matchId from matches where matches.tourId = ?)'
    const values = [tourId, tourId]
    return await mysql.query(sql, values)
}

const getNewsForAMatch = async ({matchId}) => {
    const sql = 'select * from news where news.matchId = ?'
    const values = [matchId]
    return await mysql.query(sql, values)
}



module.exports = {
    createNewsForMatchOrTour: createNewsForMatchOrTour,
    getNewsForAMatch: getNewsForAMatch,
    getNewsForATour: getNewsForATour,
    getNewsForASport: getNewsForASport
}