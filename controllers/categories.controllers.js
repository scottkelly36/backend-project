const {
    selectCategories
} = require('../models/category.model');

exports.getCategories = (req, res, next) => {
    selectCategories().then((categories) => {
        res.status(200).send({
            categories
        })
    }).catch((err) => {
        next(err)
    })
}