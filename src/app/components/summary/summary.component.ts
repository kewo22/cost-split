import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { Spending } from 'src/app/interfaces/spending.interface';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';

import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import { addEvents } from 'src/app/store/events/events.action';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { initialEventState } from 'src/app/store/eventInfo.reducer';
import { ReceiptServiceService } from 'src/app/shared/services/receipt-service.service';
import { SummaryCalculateService } from 'src/app/shared/services/summary-calculate-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  event: EventI | null = null;

  constructor(
    private store: Store,
    private receiptServiceService: ReceiptServiceService,
    private summaryCalculateService: SummaryCalculateService
  ) {

    this.store.select(selectEventInfo).subscribe((event: EventI) => {
      // const clonedEvent: EventI = { ...event };
      // const clonedSpending: Spending[] = [...event.spending];
      // const updatedSpending = clonedSpending.map((spending: Spending) => ({
      //   ...spending,
      //   participants: this.getPerPersonCost(spending),

      // }));
      // clonedEvent.spending = [...updatedSpending];
      // this.event = { ...clonedEvent };

      const calculatedEvent = this.summaryCalculateService.calculate(event);
      this.event = { ...calculatedEvent };
    });

    if (this.event) {
      // const clonedEvent: EventI = { ...this.event };
      // const updatedParticipants = clonedEvent.participants.map((participant: Participant) => ({
      //   ...participant,
      //   cost: this.getParticipantCost(clonedEvent, participant)
      // }));
      // clonedEvent.participants = [...updatedParticipants];
      // this.event = { ...clonedEvent };
    }


    if (this.event) {
      // const clonedEvent: EventI = { ...this.event };
      // const updatedParticipants = clonedEvent.participants.map((participant: Participant) => ({
      //   ...participant,
      //   due: this.getParticipantDue(participant)
      // }));
      // clonedEvent.participants = [...updatedParticipants];
      // this.event = { ...clonedEvent };
    }
    // console.log(this.event)


  }

  ngOnInit(): void {
  }

  // getPerPersonCost(spending: Spending): Participant[] | null {
  //   if (spending.participants) {
  //     // const costPerParticipant = spending.cost / spending.participants?.length;
  //     const costPerParticipant = Math.ceil(spending.cost / spending.participants?.length);
  //     const clonedParticipants: Participant[] = [...spending.participants];
  //     const result: Participant[] = clonedParticipants.map(o => ({
  //       ...o,
  //       cost: costPerParticipant,
  //     }));
  //     return result;
  //   } else {
  //     return null;
  //   }
  // }

  // getParticipantCost(event: EventI, participant: Participant): number {
  //   let participantCost = 0;
  //   event.spending.forEach((spending: Spending) => {
  //     const foundParticipant = spending.participants?.find(obj => {
  //       return obj.id === participant.id
  //     });
  //     if (foundParticipant) {
  //       participantCost = participantCost + foundParticipant.cost;
  //     }
  //   });
  //   return participantCost;
  // }

  // getParticipantDue(participant: Participant): number {
  //   let participantDue = participant.alreadyPaid - participant.cost;
  //   return participantDue;
  // }


  onGenerateSummaryImage(): void {
    if (this.event) this.receiptServiceService.print(this.event);
  }

}
