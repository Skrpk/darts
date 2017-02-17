/**
 * Created by user on 17.02.2017.
 */
import React from "react";

export default class Layout extends React.Component {
    render () {
        return <div id="wrapper">
            <h1>Enter players name</h1>
            <ul id="input-list">
                <input class="form-control"/>
                <input class="form-control"/>
            </ul>
            <button class="btn btn-success">Add player</button>
            <button class="btn btn-danger">Remove player</button>
        </div>;
    }
}