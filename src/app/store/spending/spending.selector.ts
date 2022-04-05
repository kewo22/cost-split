import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectSpending = createSelector(
    createFeatureSelector('spendingEntries'),
    (state: any) => {
        return state;
    }
)

