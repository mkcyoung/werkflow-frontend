import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux'
import { useAppSelector } from './types';


import { getTasks } from './reducers/taskReducer'
import { getPeople, addPerson } from './reducers/peopleReducer'

import { Task, Person, PersonFormValues } from './types'

import DropDown from './components/DropDown'
import AddPersonModal from "./components/AddPersonModal";
import { Button } from 'antd';

const App = () => {

  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  // initalize tasks & people
  useEffect(() => {
    console.log(" in app use effect")
    dispatch(getTasks())
    dispatch(getPeople())
  }, [dispatch])
  const tasks : Task[] = useAppSelector(state => state.tasks)
  const people : Person[] = useAppSelector(state => state.people)
  console.log("Tasks: ",tasks)
  console.log("People: ",people)
  // // initialize people
  // useEffect(() => {
  //   dispatch(getPeople())
  // }, [dispatch])
  
  

  const submitNewPerson = async (values: PersonFormValues ) => {
    console.log("submitted", values)
    dispatch(addPerson(values));
    closeModal();
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
        taskData={tasks} // this might not work well, may need to move fetching tasks to the actual modal form?
      />
      <Button onClick={() => openModal()}> add person </Button>
      {/* <ul>
        {tasks.map((task) => <DropDown key={task.id} task={task} /> )}
      </ul> */}
    </div>
  )
}

export default App;
