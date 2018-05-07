STARTING THE APP
1. Make sure that your computer has node installed.
2. Issue the command npm install from the root of the project directory.
3. Issue the command npm start from the root of the project directory.
4. Open your Chrome Browser and to go http://localhost:8888/startapp
5. Sign in with Facebook or Spotify
6. The song queue will be empty when the app first appears.
7. Go to Search Mode by checking on the box in the top left corner of the app. Give the app an entry and begin using it.
8. Uncheck search Mode to see the cover of the song that is currently playing.
9. Songs that are next in the queue automatically get played.

UI Considerations
1. The scroll for the songs in the queue works almost exclusively when the mouse is placed directly on the scroll bar. Given more time I would have the scroll work when the mouse is placed anywhere on the queue of songs. React seems to make it a bit tricky to get that to work. I thought that it had something to do with me using a table element for the songs in the queue but that doesn't seem to be the problem.

2. I would like to get the songs in the queue to get played when clicked on.
The native onClick function in React was being very inconsistent with responding to clicks. So I left that functionality out for now. Right now the only way to move from one track to the next is to click on the before and previous arrows.


3. I would like the user to be able to click on the progress bar to move the song time to any position they want.

4. State Management. 
There is a good amount of state being passed around in this app.
I was getting started on implementing Redux to make understanding the state of this application easier. But for the sake of time I submitted it without Redux.
