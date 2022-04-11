export interface Participant {
    id: number;
    name: string;
    alreadyPaid: number | 0;
    cost: number | 0;
    isAssignedToSpending: boolean;
    due: number | 0
}