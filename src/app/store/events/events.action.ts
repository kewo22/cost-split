import { createAction, props } from "@ngrx/store";
import { EventI } from "src/app/interfaces/event.interface";

export const addEvents = createAction('Add Events', props<{ events: EventI[] }>());
export const removeEvents = createAction('Remove Event', props<{ events: EventI[] }>());