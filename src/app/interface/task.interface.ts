export interface Task {
    ID: number,
    NAME: string,
    DETAILS: string,
    STATE: string,
    DCREATION: Date,
    DEnd: Date | null; 
    isEditing?: boolean;
}
