require('dotenv').config();
var moment = require('moment');
var keys = require('./keys');
var Spotify = require('node-spotify-api');
const axios = require('axios');
var fs  = require('fs');

var searchPackage = process.argv[2];


switch (searchPackage) {
  case 'spotify-this-song':
       liriSpotify();
      
    break;
      case 'movie-this':
        liriMovie();            
      break;
        case 'concert-this': 
        liriConcert();
      break;
      case 'do-what-it-says':
          fs.readFile('random.txt', 'utf8',(err, data)=>{
              if(err){
                return console.log(err);
              }
              var newData = data.split(',');
              console.log(newData[1]);

                newData[0];
                newData[1];
                if(newData[0] === 'spotify-this-song'){
                  
                  
                }


            });

  default:
    break;
}

//FUNCTIONS FOR SWITCH STATMENTS

function liriSpotify(){
//loop to handle the song name 
 var song= "";
for(var i=3; i < process.argv.length; i++){
  song +=  process.argv[i] + " ";
}
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
spotify
  .search({ type: 'track', query: song ,limit:'1' })
  .then(function(response) {
    //songs name
    console.log(response.tracks.items[0].name);
    //artist, maybe run a loop through artist for the names if more than one 
    console.log(response.tracks.items[0].artists[0].name);
    //album name
    console.log(response.tracks.items[0].album.name);  
    //preview of track
    console.log(response.tracks.items[0].external_urls.spotify);
  })
  .catch(function(err) {
    console.log(err);
  });
}


//MOVIE THIS
function liriMovie() {  
var key = keys.omdb.key;
var title = "";

for(var i=3; i < process.argv.length; i++){
  // if(process.argv[process.argv.length - 1]=== process.argv[i]){
  //   title +=  process.argv[i]
  // }else{
  title +=  process.argv[i] + "+";
  }
// }
var url = `http://www.omdbapi.com/?t=${title}&apikey=${key}&upcoming`

axios.get(url)
.then(function (response) {       
  console.log(response.data);
     
  //title
  console.log(response.data.Title);
  //realse data
  console.log(response.data.Released);
  //IMDB
  console.log(response.data.imdbRating);
  //Rotten rating
  console.log(response.data.Ratings[0].Value);
  //Country
  console.log(response.data.Country);
  //language 
  console.log(response.data.Language);
  //plot
  console.log(response.data.Plot);
  //actors
  console.log(response.data.Actors);
  })
.catch(function (error) {
  // handle error
  console.log(error);  
  })
.finally(function () {
  // always executed
  });
}

//CONCERT
function liriConcert(){
var key = keys.bands.key;  
        
var artist = "";

for(var i=3; i < process.argv.length; i++){
  if(process.argv[process.argv.length - 1]=== process.argv[i]){
    artist +=  process.argv[i]
  }else{
  artist +=  process.argv[i] + "%20";
  }       
}
var url = `http://rest.bandsintown.com/artists/${artist}/events?app_id=${key}&date=upcoming`

axios.get(url)
.then(function (response) {          
  
  if(response.data.length === 0){
    console.log('this artist has no upcoming shows');
  }else{
    //venue
    console.log(response.data[0].venue.name);
    //location 
    console.log(response.data[0].venue.city +',' + response.data[0].venue.region);
    //date
    console.log(moment(response.data[0].datetime,'hh:mm').format('MM DD YYYY') );  
  }
})
.catch(function (error) {
  // handle error
  // console.log(error);  
  console.log('error');
})
.finally(function () {
  // always executed
}); 

}