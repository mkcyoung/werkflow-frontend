import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useAppSelector } from './types';

import { getTasks } from './reducers/taskReducer'
import { getPeople } from './reducers/peopleReducer'

import { Task, Person } from './types'

import DropDown from './components/DropDown'
import AddPersonModal from "./components/AddPersonModal";
import { Button } from 'antd';


const App = () => {

  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  // initalize tasks
  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])
  const tasks : Task[] = useAppSelector(state => state.tasks)
  console.log(tasks)

  // initialize people
  useEffect(() => {
    dispatch(getPeople())
  }, [dispatch])
  const people : Person[] = useAppSelector(state => state.people)
  console.log(people)

  const submitNewPerson = () => {
    console.log('submit')
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  return (
    <div className="App">
      <AddPersonModal
        modalOpen={modalOpen}
        onSubmit={submitNewPerson}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}> add person </Button>
      {/* <ul>
        {tasks.map((task) => <DropDown key={task.id} task={task} /> )}
      </ul> */}
    </div>
  )
}

export default App;
