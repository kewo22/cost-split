import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';
import { selectEvents } from 'src/app/store/events/event.selector';
import { addParticipant, removeParticipant } from 'src/app/store/participant/participant.action';
import { selectParticipant } from 'src/app/store/participant/participant.selector';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})
export class AddParticipantComponent implements OnInit {

  @ViewChild("input") participantInputField: any | null = null;

  participant: string = '';
  alreadyPaid: number = 0;

  event: EventI | null = null;

  constructor(
    private store: Store
  ) {
    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      this.event = event;
    })
  }

  ngOnInit(): void {

  }

  onAddClick(): void {
    // test data
    // this.store.dispatch(addParticipant({
    //   alreadyPaid: 0,
    //   due: 0,
    //   id: 1,
    //   isAssignedToSpending: false,
    //   name: 'kewo'
    // }))

    // this.store.dispatch(addParticipant({
    //   alreadyPaid: 0,
    //   due: 0,
    //   id: 2,
    //   isAssignedToSpending: false,
    //   name: 'dani'
    // }))

    // this.store.dispatch(addParticipant({
    //   alreadyPaid: 0,
    //   due: 0,
    //   id: 3,
    //   isAssignedToSpending: false,
    //   name: 'ruka'
    // }))

    if (!this.participant) return;
    if (this.event) {
      const id = +(Date.now() + ((Math.random() * 100000).toFixed()));
      const clonedEvent = { ...this.event };
      const participant: Participant = {
        id: id,
        name: this.participant,
        alreadyPaid: this.alreadyPaid,
        due: 0,
        isAssignedToSpending: false
      };
      const clonedParticipants = [...clonedEvent.participants];
      clonedParticipants.push(participant);
      clonedEvent.participants = [...clonedParticipants];
      this.store.dispatch(addEventInfo(clonedEvent));
      this.participant = '';
      this.alreadyPaid = 0;
      if (this.participantInputField) this.participantInputField.elementRef.nativeElement.focus();
    }

  }

  onRemoveParticipant(participant: Participant): void {
    if (this.event) {
      const clonedEvent = { ...this.event };
      const clonedParticipants = [...clonedEvent.participants];
      const foundParticipantIndex = clonedParticipants.findIndex(clonedParticipant => {
        return clonedParticipant.id === participant.id;
      });
      if (foundParticipantIndex !== -1) {
        clonedParticipants.splice(foundParticipantIndex, 1);
        clonedEvent.participants = [...clonedParticipants];
        this.store.dispatch(addEventInfo(clonedEvent))
      }
    }
  }

}
