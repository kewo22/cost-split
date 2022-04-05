export interface Participant {
    id: number;
    name: string;
    alreadyPaid: number | 0;
    due: number | 0;
    isAssignedToSpending: boolean;
}