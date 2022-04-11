const e = require('express');
var express = require('express');
var router = express.Router();
var loginModel = require("../models/login")

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.authenticated){

    if(req.session.transection == 0)
      {
        res.send("you cant do any action anymore for today")
      }
      if(req.session.isAdmin){
      res.render('mainPageAdmin', {})
      }else{
        res.render('mainPage',{})
      }
  }
  else{
    
       res.redirect('/login')
  }
});

router.get('/login', function(req, res, next) {
    
  res.render('login', {});
});

router.post('/getlogindata',async function(req, res, next) {
  let userLogin =  {username: req.body.username, password: req.body.password}
    let result = await loginModel.checkValid(userLogin)
    
    if(req.session.authenticated){
      if(req.session.transection = 0)
      {
        res.send("you cant do any action anymore for today")
      }else{
        if(req.session.isAdmin){
        res.render('mainPageAdmin', {})
        }else{
          res.render('mainPage',{})
        }
      }
      
    }
    else{
      if(result.length > 0){
          req.session.transection = 5;
          req.session.authenticated = true
          req.session.isAdmin = result[0].isAdmin
          if(req.session.isAdmin){
            console.log("your the admin")
            res.render('mainPageAdmin', {})
          }
          else{
            console.log("your not admin")
            res.render('mainPage', {})
          }
          
        // if(result[0].numOfTransactions>0){
        // res.render('mainPage', {})
         }
       else{
        console.log("wrong username/password")
         res.redirect('login')
        // res.send("you used all your five actions");
       }
    }
    
    });

    router.get("/mainPageAdmin", function(req, res, next) {

        res.render("mainPageAdmin",{});
      
    });

    router.get("/mainPage", function(req, res, next) {
      res.render("mainPage",{});
    
  });
  router.get("/backToMain", function(req, res, next) {
      
    if(req.session.isAdmin){
    res.render('mainPageAdmin', {})
    }else{
      res.render('mainPage',{})
    }
  });


module.exports = router;
