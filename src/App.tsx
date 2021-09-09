import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useAppSelector } from './types';

import { getTasks } from './reducers/taskReducer'
import { getPeople } from './reducers/peopleReducer'

import { Task, Person } from './types'

import DropDown from './components/DropDown'


const App = () => {

  const dispatch = useDispatch()

  // initalize tasks
  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])
  const tasks : Task[] = useAppSelector(state => state.tasks)

  // initialize people
  useEffect(() => {
    dispatch(getPeople())
  }, [dispatch])
  const people : Person[] = useAppSelector(state => state.people)



  return (
    <div className="App">
      <ul>
        {/* {people.map((person) => <li key={person.id}>{person.firstName}</li>)} */}
        {tasks.map((task) => <DropDown key={task.id} task={task} /> )}
      </ul>
    </div>
  )
}

export default App;
