const News = require('../models/news')

const createNewsForMatchOrTour = async params => {
    await News.createNewsForMatchOrTour(params)
}


const getNewsForAMatchOrTourOrSport = async params => {
    const {matchId, tourId, sportId} = params
    if(matchId!=null) return await News.getNewsForAMatch({matchId})
    if(tourId!=null) return await News.getNewsForATour({tourId})
    return await News.getNewsForASport({sportId})
}


module.exports = {
    createNewsForMatchOrTour: createNewsForMatchOrTour,
    getNewsForAMatchOrTourOrSport: getNewsForAMatchOrTourOrSport
}