var express = require('express');
var router = express.Router();
var model = require("../models/users")

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let result = await model.getAllUsers()
  res.render("usersManagmentPage", {data:result})
});

router.get('/user/:username',async function(req, res, next) {
  let user = await model.getUser(req.params.username)
  res.render("userDataPage", {data: user[0]});
});


router.post('/edit/:username?',async function(req, res, next) {
  let username = req.params.username
  let data = req.body
  let resp
  if(username)
  {
    resp =await model.updateUser(username, data)
  }
  else
  {
    
     resp = await model.addUser(data)
  }
  if(resp === 'updated')
  {
    res.redirect("/users")
  }
  else
  {
  res.send(resp)
  }
});

router.get('/add', function(req, res, next) {
  res.render("userDataPage", { data: {}});
});

router.get('/delete/:username',async function(req, res, next) {
  let result = await model.deleteUser(req.params.username);
  if(result){
    console.log(req.params)
  res.redirect("/users");
  }
  else{
    res.send("sorry")
  }
  
});

module.exports = router;
