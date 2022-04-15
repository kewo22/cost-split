import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';
import { selectEvents } from 'src/app/store/events/event.selector';
import { addEvents } from 'src/app/store/events/events.action';
import { addParticipant, removeParticipant } from 'src/app/store/participant/participant.action';
import { selectParticipant } from 'src/app/store/participant/participant.selector';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})


export class AddParticipantComponent implements OnInit {

  @ViewChild("input") participantInputField: any | null = null;

  mode = Mode.CREATE;

  participantName: string = '';
  alreadyPaid: number = 0;

  event: EventI | null = null;
  updatingParticipant: Participant | null = null;

  constructor(
    private store: Store,
  ) {
    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      this.event = { ...event };
    })
  }

  ngOnInit(): void { }

  onAddClick(): void {
    if (!this.participantName) return;
    if (this.event) {
      const foundParticipant = this.event.participants.find((participant: Participant) => {
        return participant.id === this.updatingParticipant?.id
      });
      if (foundParticipant) {
        this.updateParticipant(foundParticipant);
      } else {
        this.createNewParticipant();
      }
    }
  }

  createNewParticipant() {
    if (this.event) {
      const id = +(Date.now() + ((Math.random() * 100000).toFixed()));
      const clonedEvent = { ...this.event };
      const participant: Participant = {
        id: id,
        name: this.participantName,
        alreadyPaid: this.alreadyPaid,
        cost: 0,
        due: 0,
        isAssignedToSpending: false
      };
      const clonedParticipants: Participant[] = [...clonedEvent.participants];
      clonedParticipants.push(participant);
      clonedEvent.participants = [...clonedParticipants];
      this.store.dispatch(addEventInfo(clonedEvent));
      this.updateFullState(clonedParticipants);
      this.resetFields();
    }
  }

  updateParticipant(participant: Participant): void {
    if (this.event) {
      const clonedEvent = { ...this.event };
      const clonedParticipants: Participant[] = [...clonedEvent.participants];
      const foundIndex = clonedParticipants.findIndex((clonedParticipant: Participant) => {
        return clonedParticipant.id === participant.id;
      });
      if (foundIndex !== -1) {
        const updatedParticipant: Participant = {
          ...clonedParticipants[foundIndex],
          alreadyPaid: this.alreadyPaid,
          name: this.participantName
        }
        clonedParticipants.splice(foundIndex, 1, updatedParticipant);
        clonedEvent.participants = [...clonedParticipants];
        this.store.dispatch(addEventInfo(clonedEvent));
        this.updateFullState(clonedParticipants);
        this.resetFields();
      }
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
        this.updateFullState(clonedParticipants);
      }
    }
  }

  onEditClick(participant: Participant): void {
    this.mode = Mode.UPDATE; // not using
    this.participantName = participant.name;
    this.alreadyPaid = participant.alreadyPaid;
    this.updatingParticipant = participant;
  }

  resetFields() {
    this.participantName = '';
    this.alreadyPaid = 0;
    if (this.participantInputField) this.participantInputField.elementRef.nativeElement.focus();
  }

  updateFullState(participants: Participant[]): void {
    if (this.event) {
      // this.OnAutoSave.emit(true);
      const eventInfo: EventI = {
        ...this.event,
        participants: participants,
      }
      this.store.dispatch(addEventInfo(eventInfo));
      this.store.dispatch(addEvents({ events: [eventInfo] }))
      // setTimeout(() => { this.OnAutoSave.emit(false); }, 2000);
    }

  }

}

enum Mode {
  CREATE, UPDATE
}

