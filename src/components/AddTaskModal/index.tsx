import React from 'react'
import { Typography } from 'antd'
import { Modal, Segment } from 'semantic-ui-react';
import AddTaskForm from './AddTaskForm'
import { Person, TaskFormValues } from '../../types'


interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: TaskFormValues) => Promise<void>;
    error?: string;
    peopleData: Person[];
}

const AddTaskModal = ({ modalOpen, onClose, onSubmit, error, peopleData }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} style={{textAlign: 'center'}} closeIcon>
      <Modal.Header>
          <Typography.Title> add a new task </Typography.Title>
    </Modal.Header>
      <Modal.Content scrolling>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddTaskForm onSubmit={onSubmit} onCancel={onClose} peopleData={peopleData} />
      </Modal.Content>
    </Modal>
);

// const errorMessage = (error : string) => {
//     message.error(`Error: ${error}`, 5)
// }

// const AddPersonModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
//     <Modal
//         visible={modalOpen}
//         onOk={onSubmit}
//         onCancel={onClose}
//         footer={[
//             <Button key="cancel" danger={true} shape='round' onClick={onClose}>
//                 cancel
//             </Button>,
//             <Button key='submit' type='primary' shape='round' onClick={onSubmit}>
//                 submit
//             </Button>
//         ]}
//     >
//         {error && errorMessage(error)}
//         <AddPersonForm onSubmit={onSubmit} onCancel={onClose}></AddPersonForm>
//     </Modal>
// )

export default AddTaskModal

