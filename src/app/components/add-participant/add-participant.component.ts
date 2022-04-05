import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/interfaces/participant.interface';
import { addParticipant, removeParticipant } from 'src/app/store/participant/participant.action';
import { selectParticipant } from 'src/app/store/participant/participant.selector';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})
export class AddParticipantComponent implements OnInit {

  participants: Participant[] = []
  participant: string = '';

  constructor(
    private store: Store
  ) {
    this.store.select(selectParticipant).subscribe(participants => {
      this.participants = [...participants]
    })
  }

  ngOnInit(): void {
  }

  onAddClick(): void {
    // test data

    this.store.dispatch(addParticipant({
      alreadyPaid: 0,
      due: 0,
      id: 1,
      isAssignedToSpending: false,
      name: 'kewo'
    }))

    this.store.dispatch(addParticipant({
      alreadyPaid: 0,
      due: 0,
      id: 2,
      isAssignedToSpending: false,
      name: 'dani'
    }))

    this.store.dispatch(addParticipant({
      alreadyPaid: 0,
      due: 0,
      id: 3,
      isAssignedToSpending: false,
      name: 'ruka'
    }))


    if (!this.participant) return;
    const id = +(Date.now() + ((Math.random() * 100000).toFixed()));
    const participant: Participant = {
      id: id,
      name: this.participant,
      alreadyPaid: 0,
      due: 0,
      isAssignedToSpending: false
    };
    this.participants = [...this.participants, participant];
    this.participant = '';
    this.store.dispatch(addParticipant(participant))
  }

  onEdit(participant: Participant): void {
    this.store.dispatch(removeParticipant(participant))
  }

}
