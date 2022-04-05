import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { EventI } from "../interfaces/event.interface";
import { addEventInfo } from "./eventInfo.action";

export const initialEventState: EventI = {
    date: new Date(),
    location: '',
    name: '',
};

export const eventInfoReducer = createReducer(
    initialEventState,
    on(addEventInfo, (entries, eventInfo) => {
        // const clone: EventI[] = JSON.parse(JSON.stringify(entries));
        // clone.push(eventInfo)
        return eventInfo
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