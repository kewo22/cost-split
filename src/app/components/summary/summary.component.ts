import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { Spending } from 'src/app/interfaces/spending.interface';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  event: EventI | null = null;

  constructor(
    private store: Store
  ) {

    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      const clonedEvent: EventI = { ...event };
      const clonedSpending: Spending[] = [...event.spending];
      const updatedSpending = clonedSpending.map((spending: Spending) => ({
        ...spending,
        participants: this.getPerPersonCost(spending),

      }));
      clonedEvent.spending = [...updatedSpending];
      this.event = { ...clonedEvent };
    });

    if (this.event) {
      const clonedEvent: EventI = { ...this.event };
      const updatedParticipants = clonedEvent.participants.map((participant: Participant) => ({
        ...participant,
        due: this.getParticipantDue(clonedEvent, participant)

      }));
      clonedEvent.participants = [...updatedParticipants];
      this.event = { ...clonedEvent };
    }

    console.log(this.event)

  }

  ngOnInit(): void {
  }

  getPerPersonCost(spending: Spending): Participant[] | null {
    if (spending.participants) {
      const costPerParticipant = Math.ceil(spending.cost / spending.participants?.length);
      const clonedParticipants: Participant[] = [...spending.participants];
      const result: Participant[] = clonedParticipants.map(o => ({
        ...o,
        due: costPerParticipant,
      }));
      return result;
    } else {
      return null;
    }
  }

  getParticipantDue(event: EventI, participant: Participant): number {
    let participantDue = 0;
    event.spending.forEach((spending: Spending) => {
      const foundParticipant = spending.participants?.find(obj => {
        return obj.id === participant.id
      });
      if (foundParticipant) {
        participantDue = participantDue + foundParticipant.due;
      }
    });
    return participantDue;
  }

}
