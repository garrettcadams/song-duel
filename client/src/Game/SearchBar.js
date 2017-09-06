import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import debounce from 'lodash.debounce';
import GameService from '../services/GameService.js';
import PlayerEvents from '../common/PlayerEvents.js';
import GameEvents from '../common/GameEvents.js';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.onUpdateInput = debounce(this.onUpdateInput.bind(this), 700);
        this._onSearchResults = this._onSearchResults.bind(this);
        this._search = this._search.bind(this);
        this.onNewRequest = this.onNewRequest.bind(this);

        this.state = {
            dataSource: [],
            inputValue: ''
        }
    }

    componentDidMount() {
        GameService.onEvent(GameEvents.SEARCH_RESULTS, this._onSearchResults);
    }

    onUpdateInput(inputValue) {
        this.setState({
            inputValue: inputValue
        }, this._search);
    }

    onNewRequest(searchItem) {
        this.props.onItemSelected(searchItem.id);
    }

    _search() {
        GameService.sendEvent(PlayerEvents.SEARCH, {
            "query": this.state.inputValue
        });
    }

    _onSearchResults(data) {
        let dataSource = (data.songs || []).map((song) => {
            //Create a string containing all artists who worked on song
            let artistText = song.artists.reduce((text, artist) => {
                if (text) {
                    text += ', ';
                }
                text += artist.name;
                return text;
            }, "");

            song.display = `${song.name} - ${artistText}`
            return song;
        });

        this.setState({
            dataSource: dataSource
        });
    }

    render() {
        let dataSourceConfig = {
            text: 'display',
            value: 'id'
        };

        return (
            <AutoComplete
                dataSource={this.state.dataSource}
                onUpdateInput={this.onUpdateInput}
                disabled={!this.props.enabled}
                dataSourceConfig={dataSourceConfig}
                hintText="Enter the name of a song"
                filter={(searchText, key) => true}
                onNewRequest={this.onNewRequest}
            />
        );
    }
}

export default SearchBar;