/**
 * Created by user on 17.02.2017.
 */
import React from "react";
import Input from "./Input";

import { connect } from "react-redux";

import { addPlayer } from "../actions/action";

@connect((store) => {
    return {
        players: store.players
    };
})

export default class Layout extends React.Component {

    componentWillMount() {
        this.props.dispatch(addPlayer(Date.now(), 'Виталий'));
        this.props.dispatch(addPlayer(Date.now(), 'Долбоёб'));
    }

    addPlayer () {
        this.props.dispatch(addPlayer(Date.now()));
    }

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
        return <div id="wrapper">
            <h1>Enter players name</h1>
            <ul id="input-list">
                {playersData}
            </ul>
            <button class="btn btn-success" onClick={this.addPlayer.bind(this)}>Add player</button>
        </div>;
    }
};