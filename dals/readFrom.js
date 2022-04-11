const jsonfile = require('jsonfile')

exports.readFile = function()
{
    return new Promise(resolve =>
    {
        jsonfile.readFile(__dirname + '/newMovie.json', function(err,data)
        {
            let moshe = data
            resolve(moshe)
        })
    })
    
}