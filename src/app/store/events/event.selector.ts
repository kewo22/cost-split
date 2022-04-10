import { createAction, createFeatureSelector, createSelector, props } from "@ngrx/store";

// export const addEventInfo = createAction('Add Event Info', props<any>());

export const selectEvents = createSelector(
    createFeatureSelector('eventEntries'),
    (state: any) => {
        return state;
    }
)

