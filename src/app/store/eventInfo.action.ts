import { createAction, props } from "@ngrx/store";
import { EventI } from "../interfaces/event.interface";

export const addEventInfo = createAction('Add Event Info', props<EventI>());