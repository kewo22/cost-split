import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectParticipant = createSelector(
    createFeatureSelector('participantEntries'),
    (state: any) => {
        return state;
    }
)

