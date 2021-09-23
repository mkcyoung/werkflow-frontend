import React from 'react'
import { Typography } from 'antd'
import { Modal, Segment } from 'semantic-ui-react';
import AddTaskForm from './AddTaskForm'
import { Person, Task, TaskFormValues } from '../../types'


interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: TaskFormValues) => Promise<void>;
    error?: string;
    peopleData: Person[];
    taskData: Task[];
}

const AddTaskModal = ({ modalOpen, onClose, onSubmit, error, peopleData, taskData }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} style={{textAlign: 'center'}} closeIcon>
      <Modal.Header>
          <Typography.Title> add a new task </Typography.Title>
    </Modal.Header>
      <Modal.Content scrolling>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddTaskForm onSubmit={onSubmit} onCancel={onClose} peopleData={peopleData} taskData={taskData} />
      </Modal.Content>
    </Modal>
);

export default AddTaskModal

