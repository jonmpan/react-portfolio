import React, {Component} from "react"
import Sound from "react-sound"

class SoundPlayer extends Component{
	state={

	}

	render(){
		return(
			<Sound
				url="/assets/sound/BlueSkies.mp3"
				playStatus={Sound.status.PLAYING}
				playFromPosition={0 /* in milliseconds */}
				onLoading={this.handleSongLoading}
				onPlaying={this.handleSongPlaying}
				onFinishedPlaying={this.handleSongFinishedPlaying}
				/>
		)
	}
}

export default Soundplayer;


