const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

// to increase the performance of the query, I have created an index on tours (name) and also as it is a left join, so index on tours (id) will also have to be created but since it is primary key for tours and primary key is automatically indexed in mysql so no need to do that (PROBLEM-1)
const getMatchesByTourName = async params => {
    // modified the select clause since the right table (tours) common fields were shadowing fields of left table (matches) (PROBLEM-1)
    const statement = 'select matches.name as name, tours.name as tour_name, matches.id as id, matches.tourId as tourId, matches.format as format, matches.status as status, matches.startTime as startTime, matches.endTime as endTime from matches left join tours on matches.tourId = tours.id where tours.name = ?';
    console.log("statement ", statement);
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}