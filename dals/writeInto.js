const jsonfile = require("jsonfile")
const model = require("../models/movies")

exports.writeFile = function(data)
{
        jsonfile.writeFile("dals/newMovie.json",data,function(err)
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log("nice") 
            }
        })
    
    return "nice"
}