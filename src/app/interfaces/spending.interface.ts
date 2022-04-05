import { Participant } from "./participant.interface";

export interface Spending {
    id: number;
    item: string;
    cost: number;
    participants: Participant[] | null;
}