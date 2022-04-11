import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { EventI } from "../interfaces/event.interface";
import { addEventInfo, updateEventInfo } from "./eventInfo.action";

export const initialEventState: EventI = {
    id: -1,
    date: new Date(),
    location: '',
    name: '',
    participants: [],
    spending: [],
    createdOn: new Date(),
    totalSpent: 0
};

export const eventInfoReducer = createReducer(
    initialEventState,
    on(addEventInfo, (entries, eventInfo) => {
        const clonedEvent = { ...eventInfo };

        const totalSpent = clonedEvent.spending.map(item => item.cost).reduce((prev, curr) => prev + curr, 0);
        // console.log(Math.floor(totalSpent))
        // console.log(Math.ceil(totalSpent))
        // console.log(Math.round(totalSpent))
        clonedEvent.totalSpent = totalSpent;

        return clonedEvent;
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
