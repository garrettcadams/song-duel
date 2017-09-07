import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import RaisedButton from 'material-ui/RaisedButton';

class SongButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = {
            width: "20vh",
            height: "10vh",
            "lineHeight": "138%",

        }
        return (
            <RaisedButton
                style={style}
                disabled={!this.props.enabled}
                label={this.props.song.name}
                onClick={() => {
                    this.props.onAnswer(this.props.song.id)
                }
                }
                backgroundColor={this.props.color}
                disabledBackgroundColor={this.props.color}
            />
        )
    }
}

export default SongButton;