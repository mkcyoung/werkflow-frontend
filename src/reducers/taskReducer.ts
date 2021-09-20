import taskService from '../services/tasks'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Task, Person, TaskFormValues } from '../types'

// action creator for getting all tasks
export const getTasks = () => {
    return async (dispatch : AppDispatch) => {
      const tasks = await taskService.getAll()
      dispatch({
            type: 'GET_TASKS',
            payload: tasks
        })
    }
}

export const addTask = (data : TaskFormValues) => {
    return async (dispatch: AppDispatch) => {
        const task = await taskService.addTask(data)
        dispatch({
            type: 'ADD_TASK',
            payload: task
        })
    }
}

const taskReducer = (state = [], action: PayloadAction<Task[] | Task | Person>) => {
    switch (action.type){
        case 'GET_TASKS':
            return action.payload
        case 'ADD_TASK':{
            const newTask = action.payload as Task
            return [...state, newTask]
        }
        // when a person is added, I need to add that person to the tasks that that person is trained on
        // action creator for this is in the peopleReducer, b/c we call this when we add a new person
        // alternative to this would just be to fetch people/tasks again
        case 'UPDATE_TASK_PEOPLE':{
            const person = action.payload as Person
            const personTasks = person.tasks.map(task => task.id )
            const updatedTasks : Task[] = state.map( (task : Task)  => {
                if(personTasks.includes(task.id)){
                    task.people = task.people?.concat({
                        ...person,
                        tasks: personTasks
                    })
                }
                return task
            })
            return updatedTasks
        }
        default:
            return state
    }
}

export default taskReducer