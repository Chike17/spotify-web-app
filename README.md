STARTING THE APP
1. Issue the command npm install from the root of the project.
2. Issue the command npm run from the root of the project.
3. Open your Chrome Browser and to go http://localhost:8888/startapp
4. Sign in with Facebook or Spotify
5. Once in the App go to Search Mode by checking on the box in the top left corner of the App. Give the App an entry and begin using it.

UI Considerations
1. The scroll for the songs in the queue works almost exclusively when the mouse is placed directly on the scroll bar. Given more time I would have the scroll work when the mouse is placed anywhere on the queue of songs. React seems to make it a bit tricky to get that to work. I thought that it had something to do with me using a table element for the songs in the queue but that doesn't seem to be the problem.

2. I would like to get the songs in the queue to get played when clicked on.
The native onClick function in React was being very inconsistent with responding to clicks. So I left that functionality out for now. Right now the only way to move from one track to the next is to click on the before and previous arrows.

3. Font Awesome was not being responsive when I was trying to get the icon to toggle between the play and the pause icon. I suspect that this has something to do with me having to import Font Awesome into my app through my index.html file. I had to do that for the sake of time. Getting Font Awesome to play well with React was tricky. But I definitely want to revisit that feature. 

4. I would like the user to be able to click on the progress bar to move the song time to any position they want.

State Management. 
There is a good amount of state being passed around in this app.
I was getting started on implementing Redux to make understanding the state of this application easier. But for the sake of time I submitted it without Redux.

API and error handling

I am using the searchTracks function from the Spotify API which allows the user to search for tracks by name, album, or artist.

I handled the errors from the Spotify API by messaging the user below the search bar. I believe that I handled most errors. But there are certain terms which do not seem like they should be coming back with an error but do. For instance, Kanye West comes back with an error. I'm not sure whats going on with that since he is clearly an artist that is on Spotify. Its something that I'm curious to look into.
