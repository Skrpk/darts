/**
 * Created by user on 20.02.2017.
 */
import React from "react";
import store from "../store";

import { minusPoints, deletePlayer, setName } from "../actions/action";


export default class Input extends React.Component {

    constructor () {
        super();
        this.state = {
            name: ''
        }
    }

    minusPoints (e) {
        var pointsInput = e.classList ? e.previousSibling : e.target.previousSibling;

        pointsInput.value = '';

        if (this.pointsForMinusing) {
            store.dispatch(minusPoints(this.id, this.pointsForMinusing));
            this.pointsForMinusing = '';
            pointsInput.classList.remove('input-error');
        }
    }

    enterClick (event) {
        if (event.key === 'Enter') {
            var nextPointsInput = null;
            if (event.target.parentElement.nextSibling) {
                nextPointsInput = event.target.parentElement.
                                        nextSibling.getElementsByClassName('input-points')[0];
            } else {
                nextPointsInput = event.target.parentElement.
                                parentElement.firstChild.getElementsByClassName('input-points')[0];
            }
            this.getPointsFromInput(event);
            this.minusPoints(event.target.nextSibling);
            nextPointsInput.focus();
        }
    }

    getPointsFromInput (e) {
        const number = e.target.value;
        if ( /^\d+$/.test(number) || number === '') {
            this.pointsForMinusing = Number(number);
        } else {
            e.target.classList.add('input-error');
        }
    }

    removePlayer (event) {
        store.dispatch(deletePlayer(this.id));
    }

    enableInput (event) {
        event.target.disabled = false;
        event.target.focus();
    }

    disableInput (event) {
        const target = event.target;
        target.disabled = true;
        store.dispatch(setName(this.id, target.value));
    }

    _handleChange (e){
        this.setState({name: e.target.value});
    }

    componentWillReceiveProps (nextProps) {
        this.setState({name: nextProps.name});
    }

    render () {
        this.id = this.props.id;
        const { name } = this.state;
        return (
            <li class="form">
                <input class="form-control input-name"
                       onDoubleClick={this.enableInput.bind(this)}
                       onBlur={this.disableInput.bind(this)}
                       value={name}
                       placeholder="Enter player`s name"
                       onChange={this._handleChange.bind(this)}
                />
                <input class="form-control input-points"
                       onBlur={this.getPointsFromInput.bind(this)}
                       tabIndex={this.props.tabindex}
                       onKeyPress={this.enterClick.bind(this)}
                       placeholder="Enter points"/>
                <button class="btn btn-success commit" onClick={this.minusPoints.bind(this)}>&#10004;</button>
                <span class="points alert alert-info">{this.props.points}</span>
                <button class="btn btn-danger remove" onClick={this.removePlayer.bind(this)}>&#10006;</button>
            </li>
        );
    }
}