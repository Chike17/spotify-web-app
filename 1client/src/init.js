var nums = [1, 2, 3];
var review = {'name': 'a', 'rating': 'c', 'location': 'd', 'category': 'e', 'Review': ['1', '2', '3']};
var reviews = [ review, review, review, review, review, review, review];
console.log(reviews);

const initialState = {
   result: 1,
   firstName: '',
   lastName: '',
   location: '',
   category: '',
   lastValues: []
 };

module.exports = {reviews: reviews, initialState: initialState};
