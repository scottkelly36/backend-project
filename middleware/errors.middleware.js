exports.handleWrongEndpoint = (err, req, res, next) => {
    res.status(404).send({
        msg: "Sorry we cant find that end point"
    })
}

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        msg: 'sorry something went wrong with the server'
    })
}