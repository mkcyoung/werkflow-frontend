import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Switch, Route, Link,
  useHistory,
  useRouteMatch
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getTasks, addTask } from './reducers/taskReducer'
import { getPeople, addPerson } from './reducers/peopleReducer'
import { Task, Person, PersonFormValues, TaskFormValues, useAppSelector } from './types'
import DropDown from './components/DropDown'
// import AddPersonModal from "./components/AddPersonModal";
// import AddTaskModal from "./components/AddTaskModal";
import Schedule from "./components/Schedule";
import { Button } from 'antd';
import Menu from './components/Menu';

const App = () => {

  const dispatch = useDispatch()

  // const modalState = {
  //   person: false,
  //   task: false
  // }

  // const [modalOpen, setModalOpen] = useState(modalState);
  // const [error, setError] = useState<string | undefined>();

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
  
  

  // const submitNewPerson = async (values: PersonFormValues ) => {
  //   console.log("submitted", values)
  //   dispatch(addPerson(values));
  //   closeModal();
  // }

  // const submitNewTask = async (values: TaskFormValues) => {
  //   console.log("submitted task: ", values)
  //   dispatch(addTask(values))
  //   closeModal();
  // }

  // const openModal = (modalType : 'person' | 'task'): void => {
  //   modalState[modalType] = true
  //   setModalOpen(modalState)
  // }

  // const closeModal = (): void => {
  //   modalState['person'] = false
  //   modalState['task'] = false
  //   setModalOpen(modalState);
  //   setError(undefined);

  // }

  // const history = useHistory()


  return (
    <div className="App">
      <Menu/>
      <Switch>
        <Route path='/people'>
          <div>
            people
          </div>
        </Route>
        <Route path='/tasks'>
          <div>
            tasks
          </div>
        </Route>
        <Route path='/'>
          <Schedule taskData={tasks}/>
        </Route>
      </Switch>
      {/* <Schedule taskData={tasks}/> */}
      {/* <AddPersonModal
        modalOpen={modalOpen['person']}
        onSubmit={submitNewPerson}
        error={error}
        onClose={closeModal}
        taskData={tasks} // this might not work well, may need to move fetching tasks to the actual modal form?
      />
      <AddTaskModal
        modalOpen={modalOpen['task']}
        onSubmit={submitNewTask}
        error={error}
        onClose={closeModal}
        peopleData={people} // this might not work well, may need to move fetching tasks to the actual modal form?
        taskData={tasks}
      />
      <Button onClick={() => openModal('person')}> add person </Button>
      <Button onClick={() => openModal('task')}> add task </Button> */}
      {/* <ul>
        {tasks.map((task) => <DropDown key={task.id} task={task} /> )}
      </ul> */}
    </div>
  )
}

export default App;
