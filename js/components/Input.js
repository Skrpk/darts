/**
 * Created by user on 20.02.2017.
 */
import React from "react";
import store from "../store";

import { minusPoints } from "../actions/action";


export default class Input extends React.Component {
    minusPoints (e) {
        e.target.previousSibling.value = '';
        if (this.pointsForMinusing) {
            store.dispatch(minusPoints(this.id, this.pointsForMinusing));
            this.pointsForMinusing = '';
        }
    }

    getPointsFromInput (e) {
        const number = e.target.value;
        if ( /^\d+$/.test(number) ) {
            this.pointsForMinusing = Number(number);
        } else {
            e.target.classList.add('input-error');
        }
    }

    render() {
        this.id = this.props.id;
        return (
            <li class="form">
                <input class="form-control input-name"
                       defaultValue={this.props.name}
                       placeholder="Enter player`s name"/>
                <input class="form-control input-points"
                       onBlur={this.getPointsFromInput.bind(this)}
                       placeholder="Enter points"/>
                <button class="btn btn-success commit" onClick={this.minusPoints.bind(this)}>&#10004;</button>
                <span class="points alert alert-info">{this.props.points}</span>
                <button class="btn btn-danger remove">&#10006;</button>
            </li>
        );
    }
}