/**
 * Created by user on 20.02.2017.
 */
import React from "react";
import store from "../store";

import { minusPoints, deletePlayer, setName } from "../actions/action";


export default class Input extends React.Component {

    /**
     * @desc constructor. set`s state
     */
    constructor () {
        super();
        this.state = {
            name: ''
        }
    }

    /**
     * @desc triggering a points subtraction event
     * @param e event
     */
    minusPoints (e) {
        var pointsInput = e.classList ? e.previousSibling : e.target.previousSibling;

        pointsInput.value = '';

        if (this.pointsForMinusing) {
            store.dispatch(minusPoints(this.id, this.pointsForMinusing));
            this.pointsForMinusing = '';
            pointsInput.classList.remove('input-error');
        }
    }

    /**
     * @desc handler of pressing enter being focused on input of points
     * @param event
     */
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

    /**
     * @desc gets and validate points value
     * @param e
     */
    getPointsFromInput (e) {
        const number = e.target.value;
        var pointsValue = 0;
        try {
            if ( /\+/.test(number)) {
                const RegEx=/\s/g,
                    arrayOfNumbers = (number.replace(RegEx, '')).split('+');

                pointsValue = arrayOfNumbers.reduce((sum, current) => {
                    if ( /^\d+$/.test(current) && /^\d+$/.test(sum)) {
                        return Number(sum) + Number(current);
                    } else {
                        throw Error();
                    }
                });
            } else if ( (/^\d+$/.test(number) ||
                number === '') &&
                Number(number) <= this.props.points) {
                pointsValue = Number(number);
            } else {
                throw Error();
            }

            this.pointsForMinusing = pointsValue;
        } catch (error) {
            e.target.classList.add('input-error');
        }
    }

    /**
     * @desc trigger event of player deleting
     * @param event
     */
    removePlayer (event) {
        store.dispatch(deletePlayer(this.id));
    }

    /**
     * @desc enable name input after double clicking
     * @param event
     */
    enableInput (event) {
        event.target.disabled = false;
        event.target.focus();
    }

    /**
     * @desc disable name input after bluring
     * @param event
     */
    disableInput (event) {
        const target = event.target;
        target.disabled = true;
        store.dispatch(setName(this.id, target.value));
    }

    /**
     * @desc handler of changing of typed value in name input.
     * @param e
     * @private
     */
    _handleChange (e){
        this.setState({name: e.target.value});
    }

    /**
     * @desc method calls when component receives new props
     * @param nextProps props object
     */
    componentWillReceiveProps (nextProps) {
        this.setState({name: nextProps.name});
    }

    /**
     * @desc rendering of component
     * @returns {XML}
     */
    render () {
        this.id = this.props.id;
        const { name } = this.state;
        return (
            <li class="form">
                <input class="form-control input-name"
                       onDoubleClick={this.enableInput.bind(this)}
                       onBlur={this.disableInput.bind(this)}
                       value={name || this.props.name}
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