let nums = [1, 2, 3];
let review = {'name': 'a', 'rating': 'c', 'location': 'd', 'category': 'e', 'Review': ['1', '2', '3']};
let reviews = [ review, review, review, review, review, review, review];

const initialState1 = {
   cover: '',
   topResults: [],
   screenSong: '',
   screenSong: '',
   lastValues: [],
 };

const initialState2 = {
   currentSong: '',
   trackList: [],
   lastValues: []
 };


module.exports = {reviews: reviews, initialState1: initialState1, initialState2: initialState2};