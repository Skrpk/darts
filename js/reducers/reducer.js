/**
 * Created by user on 20.02.2017.
 */
export default function reducer(state={
    players: {}
}, action) {
    const __DEFAULT_POINTS_ = 501;
    switch (action.type) {
        case "ADD_PLAYER": {
            state.players[action.id] = {
                id: action.id,
                name: action.name,
                points: __DEFAULT_POINTS_
            };
            return {...state};
        }
        case "DECREMENT_POINTS": {
            const points = state.points - action.pointsForDecr;
            state.players[action.id].points = points;
            return {...state};
        }
    }

    return state;
};