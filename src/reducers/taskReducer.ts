import taskService from '../services/tasks'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Task, Person } from '../types'

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

const taskReducer = (state = [], action: PayloadAction<Task[] | Person>) => {
    switch (action.type){
        case 'GET_TASKS':
            return action.payload
        case 'UPDATE_TASK_PEOPLE':{
            const person = action.payload as Person
            const personTasks = person.tasks.map(task => task.id )
            const updatedTasks : Task[] = state.map( (task : Task)  => {
                if(personTasks.includes(task.id)){
                    task.people = task.people?.concat({
                        ...person
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