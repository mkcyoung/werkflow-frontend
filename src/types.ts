import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from './store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface Schedule {
    sunday: string[];
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
}

export interface Task {
    id: string;
    name?: string;
    category?: string;
    schedule?: Schedule;
    people?: string[];
    time?: number;
}

export interface Person {
    id: string;
    firstName?: string;
    lastName?: string;
    schedule?: Schedule;
    tasks?: string[];
    daysOff?: string[];
}

