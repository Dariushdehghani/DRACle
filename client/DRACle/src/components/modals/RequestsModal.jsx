import Modal from "../Modal";

export default function RequestsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} >
      <h2>Join requests</h2>
    </Modal>
  )
}