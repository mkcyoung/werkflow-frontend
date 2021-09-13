import peopleService from '../services/people'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Person, PersonFormValues } from '../types'
import { getTasks } from './taskReducer'


// action creator for getting all people
export const getPeople = () => {
    return async (dispatch : AppDispatch) => {
      const people = await peopleService.getAll()
      dispatch({
            type: 'GET_PEOPLE',
            payload: people
        })
    }
}

export const addPerson = (data : PersonFormValues) => {
    return async (dispatch: AppDispatch) => {
        const person = await peopleService.addPerson(data)
        dispatch({
            type: 'ADD_PERSON',
            payload: person
        })
        dispatch({
            type: 'UPDATE_TASK_PEOPLE',
            payload: person
        })
        // await getTasks()
    }
}

const peopleReducer = (state = [], action: PayloadAction<Person[] | Person>) => {
    switch (action.type){
        case 'GET_PEOPLE':
            return action.payload
        case 'ADD_PERSON':{
            const newPerson = action.payload
            return [...state, newPerson]
        }
        default:
            return state
    }
}

export default peopleReducer

