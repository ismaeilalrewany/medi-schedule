import { createPortal } from 'react-dom'

const ConfirmModal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null

  const handleConfirm = (e) => {
    e.preventDefault()
    if (onConfirm) onConfirm()
  }

  return createPortal(
    <dialog className="modal" open>
      <div className="modal-box text-neutral">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-neutral/70" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-x"></i>
        </button>
        <h3 className="font-bold text-lg mb-4 text-center text-neutral">{title}</h3>
        <p className="py-4 text-center">{message}</p>
        <div className="modal-action mt-4 pt-4 border-t border-neutral/20">
          <button className="btn btn-ghost text-neutral/80" onClick={onClose}>Cancel</button>
          {onConfirm && <button className="btn bg-neutral text-neutral-content border-0" onClick={handleConfirm}>Confirm</button>}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  )
}

export default ConfirmModal