import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const StyledModal = ({ children, isOpen, toggleModal, title, footer }) => {
  return (
    <Modal isOpen={isOpen} toggle={() => toggleModal(false)}>
      {title && (
        <ModalHeader toggle={() => toggleModal(false)}>{title}</ModalHeader>
      )}

      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  )
}

export default StyledModal
