/**
 * Created by user on 20.02.2017.
 */

export function addPlayer(id, name) {
    return {
        type: "ADD_PLAYER",
        id,
        name
    }
}

export function decrementPoints(id, points) {
    return {
        type: "DECREMENT_POINTS",
        id,
        points
    }
}