let fetchBuffer = (url, context, callback) => {
  window.fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer, 
                                                           audioBuffer => {
                                                             callback(audioBuffer);
                                                           }, 
                                                           error => 
                                                           console.error(error, 'fetch buffer error')
                                                         ));

};

module.exports = fetchBuffer; 