const usersDal = require("../dals/readFromUsers")

exports.checkValid = async function(userData)
{
    let users = await usersDal.readFile()
    
     let result = users.filter(user => 
        userData.username == user.username && userData.password == user.password);
        
        return result
}