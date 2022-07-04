exports.handleWrongEndpoint = (err, req, res, next) => {
    console.log(err)
    res.status(404).send({
        msg: "Sorry we cant find that end point"
    })
}


exports.handleNotFound = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send(
            err.msg
        )
    } else next(err)

}

exports.handleServerErrors = (err, req, res, next) => {
    console.log(errs)

    res.status(500).send({
        err
    })
}