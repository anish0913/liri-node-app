require("dotenv").config();

// NPM Packages & API keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");

var fs = require("fs");
var query = process.argv[3];
var option = process.argv[2];


// Initialize Spotify client
var spotify = new Spotify(keys.spotify);
switch (option) 
{
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    default:

// read file
fs.readFile("random.txt", "utf8", function (error, data)
{
            
var data = data.split(",");
var data2 = data[1];
if (error) 
{
return console.log(error);
}

spotifyCall(data2);
})
}


// SPOTIFY-THIS-SONG
function spotifyCall(songName) 
{
spotify.search({ type: 'track', query: songName }, function (err, data) 
{
if (err) 
{
return console.log('Error occurred: ' + err);
}
console.log("\n_Track Info_" + "\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nLink: " + data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n" + "\nKeep Searching")
});
}

// MOVIE-THIS
function movieThis(movieName) 
{
if (!movieName) 
{
movieName = "Mr. Nobody";
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
axios.get(queryUrl).then(
function (response) 
{
console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Keep Searching!");
}
);
}

// CONCERT-THIS
function concertThis(artist) {
  console.log('artist', artist);
  var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(bandsQueryUrl).then(function (response) {
  console.log("_Upcoming Events_");
    console.log(response.data[0])
  console.log("Artist: " + artist + "\nVenue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.country + "\nDate: " + response.data[0].datatime + "\nKeep Searching!");
  });
}