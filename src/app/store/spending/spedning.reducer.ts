import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { Spending } from "src/app/interfaces/spending.interface";
import { addSpending, removeSpending, updateSpending } from "./spending.action";

export const initialEventState: Spending[] = [];

export const spendingReducer = createReducer(
    initialEventState,
    on(addSpending, (entries, spending) => {
        const clone: Spending[] = JSON.parse(JSON.stringify(entries));
        clone.push(spending)
        return clone
    }),
    on(updateSpending, (entries, spending) => {
        const clone: Spending[] = JSON.parse(JSON.stringify(entries));
        const foundIndex = clone.findIndex(obj => {
            return obj.id === spending.id;
        });
        if (foundIndex !== -1) {
            clone.splice(foundIndex, 1, spending);
        }
        return clone
    }),
    on(removeSpending, (entries, spending) => {
        const clone: Spending[] = JSON.parse(JSON.stringify(entries));
        const foundIndex = clone.findIndex(obj => { return spending.id === obj.id; });
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