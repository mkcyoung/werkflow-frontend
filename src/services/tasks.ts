import axios from 'axios'
import { Task, TaskFormValues } from '../types'
const baseUrl = '/api/tasks'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const addTask = async (values : TaskFormValues) => {
    const response = await axios.post<Task>(
        baseUrl, values
      );
    return response.data
}

export default {
    getAll,
    addTask
}