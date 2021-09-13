import axios from 'axios'
import { PersonFormValues, Person } from '../types'
const baseUrl = '/api/people'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const addPerson = async (values : PersonFormValues) => {
    const response = await axios.post<Person>(
        baseUrl, values
      );
    return response.data
}

export default {
    getAll,
    addPerson
}