import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
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

  mode = Mode.CREATE;

  @ViewChild("input") participantInputField: any | null = null;

  participantName: string = '';
  alreadyPaid: number = 0;

  event: EventI | null = null;
  updatingParticipant: Participant | null = null;
  // updatingParticipant: Participant | null = null;

  constructor(
    private store: Store,
  ) {
    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      this.event = { ...event };
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
      const clonedParticipants = [...clonedEvent.participants];
      clonedParticipants.push(participant);
      clonedEvent.participants = [...clonedParticipants];
      this.store.dispatch(addEventInfo(clonedEvent));
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

}

enum Mode {
  CREATE, UPDATE
}

