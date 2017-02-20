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

    render () {
        var playersData = [];
        var key = 0;
        for(var player in this.props.players) {
            playersData.push(<Input name={this.props.players[player].name} 
                                    points={this.props.players[player].points}
                            key={key++}/>);
        }
        return <div id="wrapper">
            <h1>Enter players name</h1>
            <ul id="input-list">
                {playersData}
            </ul>
            <button class="btn btn-success">Add player</button>
        </div>;
    }
};