import { createAction, createFeatureSelector, createSelector, props } from "@ngrx/store";
import { EventI } from "src/app/interfaces/event.interface";

// export const addEventInfo = createAction('Add Event Info', props<any>());

export const selectEvents = createSelector(
    createFeatureSelector('eventEntries'),
    (state: any) => {
        return state;
    }
)

export const selectEventById = (id: number) => createSelector(selectEvents, (events: EventI[]) => {
    const foundEvent: EventI | undefined = events.find((event: EventI) => {
        return event.id === id;
    });
    return foundEvent;
});

