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

// export interface Schedule {
//     sunday: string[];
//     monday: string[];
//     tuesday: string[];
//     wednesday: string[];
//     thursday: string[];
//     friday: string[];
//     saturday: string[];
// }

export interface SubTask {
    start: string,
    end: string
}

export interface TaskDay {
    fullDay: boolean,
    subTasks?: SubTask[] | null
}

export interface Task {
    id: string;
    name: string;
    category: string;
    schedule: TaskDay;
    people: PersonMinimized[];
    taskTime: number;
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

// This is the task object that is stored in each person field 'tasks' 
// I populate this using mongoose in the backend. If I change that population,
// I should change this type to match it.
export interface TaskMinimized {
    id: string,
    name: string
}

// Similar to TaskMinimized, this is the populate object stored within the 
// Task field 'People' - if I change how I populated I should change this type as well.
export interface PersonMinimized {
    id: string,
    name: Name,
    schedule: Day[],
    tasks: string[] //for each person stored in the task Object, the tasks are just stored as object id's
    daysOff: DayOff[],
}

export interface Person {
    id: string;
    name: Name;
    schedule: Day[];
    tasks: TaskMinimized[];
    daysOff: DayOff[];
}

// Person field with tasks omitted
export type PersonNoTasks = Omit<Person, 'tasks'>;

export type TasksNoPeople = Omit<Task,'people'>

export interface PersonFormValues {
    name: Name;
    schedule: Day[];
    tasks: string[]
}

export interface TaskFormValues {
    name: string;
    category: string;
    schedule: TaskDay;
    people: string[];
    taskTime: number;
}
