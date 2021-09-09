import taskService from '../services/tasks'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Task } from '../types'

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

const taskReducer = (state = [], action: PayloadAction<Task[]>) => {
    switch (action.type){
        case 'GET_TASKS':
            return action.payload
        default:
            return state
    }
}

export default taskReducer