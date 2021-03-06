let PlayerState = require('Game/Player/PlayerState.js');
const possibleStates = require("events/GameEvents.js");

class WaitSongState extends PlayerState {
    constructor(playerController, score, displayName) {
        super(playerController, score, displayName);
        this.stateId = possibleStates.WAIT_SONG;

        //No need for player to make move here as they're waiting for song
        this.madeMove = true;
    }

    updateState(gameData) {
        const DisplaySongAnswerState = require('Game/Player/DisplaySongAnswerState.js');

        let newState = new DisplaySongAnswerState(this.playerController, this.score, this.displayName);
        newState.playerController.updateState(newState.stateId, gameData);
        return newState;
    }
}

module.exports = WaitSongState;