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

export function minusPoints(id, points) {
    return {
        type: "DECREMENT_POINTS",
        id,
        points
    }
}

export function deletePlayer(id) {
    return {
        type: "DELETE_PLAYER",
        id
    }
}

export function setName (id, name) {
    return {
        type: "SET_NAME",
        id,
        name
    }
}