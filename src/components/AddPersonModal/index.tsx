import React from 'react'
// import { Modal, Button, message } from 'antd'
import { Modal, Segment } from 'semantic-ui-react';
import AddPersonForm from './AddPersonForm'
import { Task } from '../../types'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    error?: string;
    taskData: Task[];
}

const AddPersonModal = ({ modalOpen, onClose, onSubmit, error, taskData }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} style={{textAlign: 'center'}} closeIcon>
      <Modal.Header>Add a new person</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddPersonForm onSubmit={onSubmit} onCancel={onClose} taskData={taskData} />
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

export default AddPersonModal

