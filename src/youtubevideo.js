
import React from 'react';
//version 1


var previousIndex = 0;
class YouTubeVideo extends React.PureComponent {
  
  

  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  loadVideo = () => {
    const { videoIDs} = this.props;

    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player`, {
      playerVars : {
        playlist: videoIDs.join(','),
    },
      events: {
       // onReady: this.onPlayerReady,
         onStateChange: this.onPlayerStateChange
      },
    });
  };

  
  onPlayerStateChange = event => { 
    const { videoIDs} = this.props;
    /*
                the video has changed
                seize the opportunity to update the playlist without interruption
                */
               // eslint-disable-next-line 
               if(event.data == -1) {
                    
                // get current video index
                var index = this.player.getPlaylistIndex();
                
                // update when playlists do not match
                // eslint-disable-next-line 
                if(this.player.getPlaylist().length != videoIDs.length) {
                    
                  // update playlist and start playing at the proper index
                  this.player.loadPlaylist(videoIDs, previousIndex+1);
                }
                
                /*
                keep track of the last index we got
                if videos are added while the last playlist item is playing,
                the next index will be zero and skip the new videos
                to make sure we play the proper video, we use "last index + 1"
                */
                previousIndex = index;
            }
  };

  playButton = event => {
    this.player.playVideo();
  };
   pauseButton = event => {
    this.player.pauseVideo();
  };
  nextButton = event => {
    this.player.nextVideo();
  };
  stopButton = event => {
    this.player.stopVideo();
  };
  previousButton = event => {
    this.player.previousVideo();
  };




  render = () => {
  // const { videoIDs} = this.props;
   
    return (
      <div >
        <div id={`youtube-player`}  />
        
        
  <div className="buttons">
  <button className="button" id="play-button" onClick={this.playButton} >play</button>
  <button className="button" id="pause-button" onClick={this.pauseButton}>pause</button>

  <button className="button" id="previous" onClick={this.previousButton}>previous</button>
  <button className="button" id="next" onClick={this.nextButton}>Next</button>
  <button className="button" id="stop-button" onClick={this.stopButton}>stop</button></div>
      </div>
    );
  };
}

export default YouTubeVideo;