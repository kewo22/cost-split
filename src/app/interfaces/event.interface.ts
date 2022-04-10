import { Participant } from "./participant.interface";
import { Spending } from "./spending.interface";

export interface EventI {
    id: number;
    name: string;
    date: Date;
    location: string;
    participants: Participant[]
    spending: Spending[];
    createdOn: Date;
    totalSpent: number
}