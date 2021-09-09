import React from 'react'
import { Modal, Button, message } from 'antd'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    error?: string;
}

const errorMessage = (error : string) => {
    message.error(`Error: ${error}`, 5)
}

const AddPersonModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal
        visible={modalOpen}
        onOk={onSubmit}
        onCancel={onClose}
        footer={[
            <Button key="cancel" danger={true} shape='round' onClick={onClose}>
                cancel
            </Button>,
            <Button key='submit' type='primary' shape='round' onClick={onSubmit}>
                submit
            </Button>
        ]}
    >
        {error && errorMessage(error)}
        <div>
            the modal!
        </div>
    </Modal>
)

export default AddPersonModal

