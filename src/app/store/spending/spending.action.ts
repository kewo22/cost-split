import { createAction, props } from "@ngrx/store";
import { Spending } from "src/app/interfaces/spending.interface";

export const addSpending = createAction('Add Spending', props<Spending>());
export const updateSpending = createAction('Update Spending', props<Spending>());
export const removeSpending = createAction('Remove Spending', props<Spending>());
// export const removeParticipant = createAction('Remove Participant', props<Participant>());