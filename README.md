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
1. The scroll for the songs in the queue works almost exclusively when the mouse is placed directly on the scroll bar. React seems to not play well with regular scroll elements. I'm working through solving that. 

2. I would like to get the songs in the queue to get played when clicked on. But the native onClick function in React was being very inconsistent with responding to clicks. So I left that functionality out for now. Right now to move from one track to the next you must click on the before and previous arrows.


3. I would like the user to be able to click on the progress bar to move the song time to any position they want. That feature is on the way. 

4. State Management. 
There is a good amount of state being passed around in this app.
So Redux is somnething that I plan on implementing.