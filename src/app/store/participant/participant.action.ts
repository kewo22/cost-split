import { createAction, props } from "@ngrx/store";
import { Participant } from "src/app/interfaces/participant.interface";

export const addParticipant = createAction('Add Participant', props<Participant>());
export const removeParticipant = createAction('Remove Participant', props<Participant>());