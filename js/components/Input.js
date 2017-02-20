/**
 * Created by user on 20.02.2017.
 */
import React from "react";

export default class Input extends React.Component {
    render() {
        return (
            <li class="form">
                <input class="form-control input-name" defaultValue={this.props.name} placeholder="Enter player`s name"/>
                <input class="form-control input-points" placeholder="Enter points"/>
                <span class="points">{this.props.points}</span>
                <button class="btn btn-danger remove">&#10006;</button>
            </li>
        );
    }
}