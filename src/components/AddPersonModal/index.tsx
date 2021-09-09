import React from 'react'
import { Modal, Button } from 'antd'

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    error?: string;
}

const AddPersonModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal
        visible={modalOpen}
        onOk={onSubmit}
        onCancel={onClose}
        footer={[
            <Button key="cancel" onClick={onClose}>
                cancel
            </Button>,
            <Button key='submit' onClick={onSubmit}>
                submit
            </Button>
        ]}
    >
        <div>
            the modal!
        </div>
    </Modal>
)

export default AddPersonModal

