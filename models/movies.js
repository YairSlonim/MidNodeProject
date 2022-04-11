const moviesDal = require("../dals/allMovies")
const writeToFile = require("../dals/writeInto")
const readFromFile = require("../dals/readFrom")
exports.getAllMovies = async function(name,genre,language)
{
    let resp = await moviesDal.getMovies()
    let data = resp.data;
    let movies = data.filter(x => x.id<100)
    
    let readFile = await readFromFile.readFile()
        let newMovie = {
            "id": readFile.length + 4,
            "name": name,
            "language":language,
            "genres":genre
            }
        
    if(readFile.length>0){
        readFile.push(newMovie)
    let result = await writeToFile.writeFile(readFile) 
            
            return result; 
        } else{
            return "failed";
        }   
}

exports.filterLanguage = async function()
{
    let readFile = await readFromFile.readFile()
    
    let Languages = readFile.map(x => {
        return x.language
    })
    var seenLanguages = {};
    let filteredLanguages = Languages.filter(function(currentObject) {
    if (currentObject in seenLanguages) {
        return false;
    } else {
        seenLanguages[currentObject] = true;
        return true;
    }
    });
    return filteredLanguages
}

exports.filterGenre = async function()
{
    let readFile = await readFromFile.readFile()
    let temp = [];
    let genre = readFile.map(x => {
        return x.genres.map(i =>{
             temp.push(i)
        })
        
    })
    
    var seenGenre = {};
    let filteredgenre = temp.filter(function(currentObject) {
    if (currentObject in seenGenre) {
        return false;
    } else {
        seenGenre[currentObject] = true;
        return true;
    }
    });
    return filteredgenre ;
}

exports.searchForMovie = async function(obj)
{
    let movieFromUser = {
        "name": obj.name,
        "language":obj.language,
        "genres": obj.genres
    }

    let movies = await readFromFile.readFile()

    let result = movies.filter(movie => {
        if(movieFromUser.name == movie.name){
            return movie;
        }
    }
         );
        
    return result;
}

exports.searchForMovieByName = async function(name)
{
    let movies = await readFromFile.readFile()

    let result = movies.filter(movie => {
        if(name === movie.name){
            return movie;
        }
    }
         ); 
    return result;
}

exports.searchMoviesByGenre = async function(genre,name)
{
    
        let movies = await readFromFile.readFile()
        
        let result=[];
            for(let i =0; i < movies.length; i++){
                for(let j=0;j< movies[i].genres.length ;j++){
                    if(genre.includes(movies[i].genres[j])){
                        result.push(movies[i].name)
                    }
                    
                }
            }
            
            let result2 = result.filter(x => {
               return x!=name
            })

            var genres = {};
            let filteredgenres = result2.filter(function(currentObject) {
            if (currentObject in genres) {
                return false;
            } else {
                genres[currentObject] = true;
                return true;
            }
            });
        return filteredgenres;
    
}