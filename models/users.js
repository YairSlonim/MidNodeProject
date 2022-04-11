const usersDal = require("../dals/readFromUsers")
const writeToFile = require("../dals/writeIntoUsers")

exports.getAllUsers = async function()
{
    let users = await usersDal.readFile()
    return users;
}

exports.getUser = async function(username)
{
    let users = await usersDal.readFile()
    let user = users.filter(x => x.username == username)
    return user;
}

exports.updateUser = async function(username,data)
{
    
    let users = await usersDal.readFile()
     let newUsers = users.map(x =>{
        if(x.username == username){
            x = data
        }
        return x;
    })
        
     result = await writeToFile.writeFile(newUsers)
    
     return 'updated';
}

exports.addUser = async function(data)
{
    let readFile = await usersDal.readFile()
    
    let obj = { 
        "username": data.username,
        "password": data.password,
        "numOfTransactions":parseFloat(data.numOfTransactions),
        "isAdmin":JSON.parse(data.isAdmin)
        }
   
    readFile.push(obj)
    result = await writeToFile.writeFile(readFile)
    return 'updated';
}

exports.deleteUser = async function(username)
{
    
    let users = await usersDal.readFile()
    
     let newUsers = users.filter(x =>{
        if(x.username != username){
            return x;
        }
        [];
    })
        
     result = await writeToFile.writeFile(newUsers)
    
     return 'updated';
}