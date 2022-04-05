import { createAction, createFeatureSelector, createSelector, props } from "@ngrx/store";

// export const addEventInfo = createAction('Add Event Info', props<any>());

export const selectEventInfo = createSelector(
    createFeatureSelector('eventInfoEntries'),
    (state: any) => {
        return state;
    }
)

