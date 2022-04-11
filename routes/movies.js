const e = require('express');
var express = require('express');
var router = express.Router();
var model = require("../models/movies")

router.get('/', function(req, res, next) {

  if(req.session.authenticated){
    res.render("createMoviePage",{});
  }
  else{
       res.redirect('/login')
  }
});

router.post("/createMovie",async function(req, res, next) {
  if(req.session.isAdmin == false){
    if(req.session.transection <= 0){
      res.send("you finished your transection for tody")
    }
  }
    let string = req.body.genres;
	  string = string.substring(0,string.length)
	  let s = string.split(",")
    
    
      let resp = await model.getAllMovies(req.body.name,s,req.body.language)
      if(resp == 'nice'){
          if(req.session.isAdmin){
          res.redirect("/mainPageAdmin");
          }
          else{
            req.session.transection -=1;
            console.log(req.session.transection)
            res.redirect("/mainPage");
          }
        }
        else{
          res.send("failed")
        }
    
});


  router.get("/searchMoviePage",async function(req, res, next) {
      let results = await model.filterLanguage()
      let results2 = await model.filterGenre()

    res.render("searchMoviePage", {language: results, genres: results2});
    });

    router.get("/searchResults",async function(req, res, next) {
      //console.log(req.query + " kakiiiii ")
      let results = await model.searchForMovie(req.query)
      let results2 = await model.searchMoviesByGenre(results[0].genres,results[0].name)
      if(req.session.isAdmin == false){
        if(req.session.transection <= 0){
          res.send("you finished your transection for tody")
        }
        req.session.transection -=1;
        console.log(req.session.transection)
      }
      
        if(results.length>0){
          res.render("searchResults", { data: results[0].name, data2: results2});
        }else{
          res.send("kishkus balabush")
        }
        
      
    });
    
    router.get("/movies/:data",async function(req, res, next) {
      //console.log(req.query + " kakiiiii ")
      let results = await model.searchForMovieByName(req.params.data)
     if(results.length > 0){
      res.render("movieData", {data: results})
     }else{
       res.send("fail")
     }
     
    });
    

module.exports = router;