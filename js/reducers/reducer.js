/**
 * Created by user on 20.02.2017.
 */

// method for deep cloning objects
Object.deepExtend = function(destination, source) {
    for (var property in source) {
        if (typeof source[property] === "object" &&
            source[property] !== null ) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

export default function reducer(state={
    players: {}
}, action) {
    const __DEFAULT_POINTS_ = 501;

    switch (action.type) {
        case "ADD_PLAYER": {
            var newPlayersObj = {...state.players};
            newPlayersObj[action.id] = {
                id: action.id,
                name: action.name || '',
                points: __DEFAULT_POINTS_
            };
            return {...state, players: newPlayersObj};
        }
        case "DECREMENT_POINTS": {
            const points = state.players[action.id].points - action.points;
            var newPlayersObj = JSON.parse(JSON.stringify(state.players));
            newPlayersObj[action.id].points = points;
            return {...state, players: newPlayersObj};
        }
        case "DELETE_PLAYER": {
            delete state.players[action.id];
            return {...state, players: Object.assign(state.players)};
        }
    }

    return state;
};