let nums = [1, 2, 3];
let review = {'name': 'a', 'rating': 'c', 'location': 'd', 'category': 'e', 'Review': ['1', '2', '3']};
let reviews = [ review, review, review, review, review, review, review];
let stock = 'https://static1.squarespace.com/static/585e12abe4fcb5ea1248900e/t/5aab1c5b03ce6430365833ac/1521163366180/Spotify+Square.png?format=300w';


const initialState1 = {
   cover: stock,
   topResults: [],
   screenSong: '',
   screenArtist: '',
   trackListUI: [],
   coverLastValues: [],
   topResultsLastValues: [],
   screenSongLastValues: [],
   screenArtistLastValues: [],
   trackListUILastValues:[]
 };

const initialState2 = {
   currentSong: '',
   urls: [],
   lastValues: []
 };


module.exports = {reviews: reviews, initialState1: initialState1, initialState2: initialState2};