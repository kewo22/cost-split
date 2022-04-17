import { Injectable } from '@angular/core';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { Spending } from 'src/app/interfaces/spending.interface';

@Injectable()
export class SummaryCalculateService {

    constructor() { }

    calculate(event: EventI): EventI {
        const clonedEvent: EventI = { ...event };
        const clonedSpending: Spending[] = [...event.spending];
        const updatedSpending = clonedSpending.map((spending: Spending) => ({
            ...spending,
            participants: this.getPerPersonCost(spending),

        }));
        clonedEvent.spending = [...updatedSpending];
        // this.event = { ...clonedEvent };

        // const clonedEvent: EventI = { ...this.event };
        const updatedParticipants = clonedEvent.participants.map((participant: Participant) => ({
            ...participant,
            cost: this.getParticipantCost(clonedEvent, participant)
        }));
        clonedEvent.participants = [...updatedParticipants];
        // this.event = { ...clonedEvent };

        // const clonedEvent: EventI = { ...this.event };
        const updatedParticipants2 = clonedEvent.participants.map((participant: Participant) => ({
            ...participant,
            due: this.getParticipantDue(participant)
        }));
        clonedEvent.participants = [...updatedParticipants2];
        // this.event = { ...clonedEvent };


        return clonedEvent;
    }


    private getPerPersonCost(spending: Spending): Participant[] | null {
        if (spending.participants) {
            // const costPerParticipant = spending.cost / spending.participants?.length;
            const costPerParticipant = Math.ceil(spending.cost / spending.participants?.length);
            const clonedParticipants: Participant[] = [...spending.participants];
            const result: Participant[] = clonedParticipants.map(o => ({
                ...o,
                cost: costPerParticipant,
            }));
            return result;
        } else {
            return null;
        }
    }

    private getParticipantCost(event: EventI, participant: Participant): number {
        let participantCost = 0;
        event.spending.forEach((spending: Spending) => {
            const foundParticipant = spending.participants?.find(obj => {
                return obj.id === participant.id
            });
            if (foundParticipant) {
                participantCost = participantCost + foundParticipant.cost;
            }
        });
        return participantCost;
    }

    private getParticipantDue(participant: Participant): number {
        let participantDue = participant.alreadyPaid - participant.cost;
        return participantDue;
    }

}  