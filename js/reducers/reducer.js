/**
 * Created by user on 20.02.2017.
 */

/**
 * @desc reducer method
 * @param state
 * @param action
 * @returns {*}
 */
export default function reducer(state={
    players: {}
}, action) {
    const __DEFAULT_POINTS_ = 501;
    var newPlayersObj = {};
    switch (action.type) {
        case 'ADD_PLAYER': {
            newPlayersObj = {...state.players};
            newPlayersObj[action.id] = {
                id: action.id,
                name: action.name || '',
                points: __DEFAULT_POINTS_
            };
            return {...state, players: newPlayersObj};
        }
        case 'DECREMENT_POINTS': {
            const points = state.players[action.id].points - action.points;
            newPlayersObj = JSON.parse(JSON.stringify(state.players));
            newPlayersObj[action.id].points = points;
            return {...state, players: newPlayersObj};
        }
        case 'DELETE_PLAYER': {
            newPlayersObj = JSON.parse(JSON.stringify(state.players));
            delete newPlayersObj[action.id];
            return {...state, players: newPlayersObj};
        }
        case 'SET_NAME': {
            newPlayersObj = JSON.parse(JSON.stringify(state.players));
            newPlayersObj[action.id].name = action.name;
            return {...state, players: newPlayersObj};
        }
    }

    return state;
}