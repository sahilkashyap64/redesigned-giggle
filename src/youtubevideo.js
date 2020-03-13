
import React from 'react';
//version 1


var currentVideoId = 0;
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
   // const { id } = this.props;

    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player`, {
      
      events: {
        onReady: this.onPlayerReady,
         onStateChange: this.onPlayerStateChange
      },
    });
  };

  onPlayerReady = event => {
    const { videoIDs} = this.props;
    event.target.loadVideoById(videoIDs[currentVideoId]);
    this.player.loadPlaylist( {
      playlist:videoIDs
  } );
  };
  onPlayerStateChange = event => { 
    const { videoIDs} = this.props;
    // eslint-disable-next-line
    if (event.data == window.YT.PlayerState.ENDED) {
    currentVideoId++;
    if (currentVideoId < videoIDs.length) {
      this.player.loadVideoById(videoIDs[currentVideoId]);
    }
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
