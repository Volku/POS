var test = require('../ProductQuery')
function eieiHandler(req, res) {
    console.log(req.body)
    res.send({
        'hello': 'eiei'
    })
}
function dbcr(req, res){
    test.arrowDbc()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(data)
        })
}



module.exports = {
    eieiHandler,
    dbcr
}