import peopleService from '../services/people'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { Person } from '../types'

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

const peopleReducer = (state = [], action: PayloadAction<Person[]>) => {
    switch (action.type){
        case 'GET_PEOPLE':
            return action.payload
        default:
            return state
    }
}

export default peopleReducer

