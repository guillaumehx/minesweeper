export type GenerationStrategy = 'AT_FIRST_CLICK' | 'BEFORE_STARTING';

export enum GameMode {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    EXPERT = 'Expert',
    CUSTOM = 'Custom'
}

export interface NotificationStatus {
    status: string;
    flagged: number;
    time: number;
}

export type HistoryRecord = NotificationStatus & {
    mode: GameMode;
    date: Date;
    input?: BoardInput;
}

export interface BoardInput {
    row: number;
    column: number;
    mine: number;
}
