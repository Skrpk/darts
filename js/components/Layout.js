/**
 * Created by user on 17.02.2017.
 */
import React from 'react';
import Input from './Input';

import { connect } from 'react-redux';

import { addPlayer } from '../actions/action';

@connect((store) => {
    return {
        players: store.players
    };
})

export default class Layout extends React.Component {
    /**
     * @desc add two players after loading
     */
    componentWillMount() {
        this.props.dispatch(addPlayer(Date.now(), 'Vitali'));
        this.props.dispatch(addPlayer(Date.now(), 'Cheburashka'));
    }

    /**
     * @desc add player
     */
    addPlayer () {
        this.props.dispatch(addPlayer(Date.now()));
    }

    /**
     * @desc component rendering method
     * @returns {XML}
     */
    render () {
        var { players } = this.props;
        var playersData = [];
        var key = 0;
        for(var player in this.props.players) {
            playersData.push(<Input name={players[player].name}
                                    points={players[player].points}
                                    id={players[player].id}
                                    key={key++}
                                    tabindex={key}/>);
        }
        return <div id='wrapper'>
            <h1>Enter players name</h1>
            <ul id='input-list'>
                {playersData}
            </ul>
            <button class='btn btn-success' onClick={this.addPlayer.bind(this)}>Add player</button>
        </div>;
    }
};