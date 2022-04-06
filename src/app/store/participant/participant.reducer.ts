import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { Participant } from "src/app/interfaces/participant.interface";
import { addParticipant, removeParticipant } from "./participant.action";

export const initialEventState: Participant[] = [];

export const participantReducer = createReducer(
    initialEventState,
    on(addParticipant, (entries, participant) => {
        console.log(entries)
        const clone: Participant[] = JSON.parse(JSON.stringify(entries));
        clone.push(participant)
        return clone
    }),
    on(removeParticipant, (entries, participant) => {
        const clone: Participant[] = JSON.parse(JSON.stringify(entries));
        const foundIndex = clone.findIndex(obj => { return participant.id === obj.id; });
        if (foundIndex !== -1) {
            clone.splice(foundIndex, 1);
        }
        return clone
    }),
);

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = localStorage.getItem('state');
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("state");
                }
            }
        }
        const nextSate = reducer(state, action);
        localStorage.setItem("state", JSON.stringify(nextSate));
        return nextSate;
    }
}