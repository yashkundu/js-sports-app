const News = require('../controllers/news')

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const {matchId, tourId} = req.query
            const {title, description} = req.body


            // exactly one of matchId, tourId should be null
            if((matchId==null && tourId==null) || (matchId!=null && tourId!=null)) {
                return res.status(400).json({message: "Exactly one on matchId or tourId has to be provided in the query parameter"})
            }
            if(!title) {
                return res.status(400).json({message: "Title cannot be empty"})
            }

            await News.createNewsForMatchOrTour({title, description, matchId, tourId})

            res.status(201).json({message: "Successfully created the news"})


        } catch (err) {
            next(err)
        }
        
    }).get(async (req, res, next) => {
        try {
            const {matchId, tourId, sportId} = req.query
            const nonNullables = [matchId, tourId, sportId]
            let count = 0;
            for(let i=0;i<3;i++) {
                if(nonNullables[i]!=null) count++;
            }
            if(count!=1) {
                return res.status(400).json({message: "Exactly one of matchId, tourId and sportId should be given in the query param"})
            }
            return res.json(await News.getNewsForAMatchOrTourOrSport(req.query))
        } catch (err) {
            next(err)
        }
    })
}