import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { EventI } from "src/app/interfaces/event.interface";
import { addEvents } from "./events.action";

export const initialEventState: EventI[] = [];

export const eventReducer = createReducer(
    initialEventState,
    on(addEvents, (entries, eventsEntries) => {
        console.log(entries, eventsEntries);
        const clone: EventI[] = JSON.parse(JSON.stringify(entries));
        clone.push(eventsEntries.events[0])
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