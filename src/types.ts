import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from './store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface PersonHours {
    start: string;
    end: string;
}

export type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface Day {
    // date: Date;
    day: WeekDay;
    time: PersonHours;
    taskHours: number;
}

// export interface PersonSchedule {
//     sunday: Day;
//     monday: Day;
//     tuesday: Day;
//     wednesday: Day;
//     thursday: Day;
//     friday: Day;
//     saturday: Day;
// }

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
    name: string;
    category: string;
    schedule: Schedule;
    people?: Person[];
    time?: number;
}

export interface DayOff {
    date: string,
    allDay: boolean,
    timeIn?: PersonHours
}

export interface Name {
    first: string;
    last: string
}

export interface Person {
    id: string;
    name: Name;
    schedule: Day[];
    tasks: Task[];
    daysOff?: DayOff[];
}

// Person field with tasks omitted
export type PersonNoTasks = Omit<Person, 'tasks'>;

export type TasksNoPeople = Omit<Task,'people'>

export interface PersonFormValues {
    name: Name;
    schedule: Day[];
    tasks: string[]
}
