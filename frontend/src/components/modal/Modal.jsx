import { createPortal } from 'react-dom'
import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children, onSubmit, submitButtonText = 'Save Changes', showSubmitButton = true }) => {
  const portalRoot = document.getElementById('modal-root')

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  if (!portalRoot) {
    console.error("The 'modal-root' element was not found in the DOM.")
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(e)
    }
  }

  return createPortal(
    <dialog className="modal" open={isOpen}>
      <div className="modal-box text-neutral">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-neutral/70"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {title && <h3 className="font-bold text-lg mb-4 text-center text-neutral">{title}</h3>}
        <div className="py-4">{children}</div>
        {/* Only render action buttons if an onSubmit or onClose handler is provided */}
        {(onSubmit || onClose) && (
          <div className="modal-action mt-4 pt-4 border-t border-neutral/20">
            <button className="btn btn-ghost text-neutral/80" onClick={onClose}>
              Cancel
            </button>
            {showSubmitButton && onSubmit && (
              <button
                type="submit"
                className="btn bg-neutral text-neutral-content border-0"
                onClick={handleSubmit}
              >
                {submitButtonText}
              </button>
            )}
          </div>
        )}
      </div>
      {/* Use a form for the backdrop for proper dialog behavior, allowing ESC to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Close</button>
      </form>
    </dialog>,
    portalRoot
  )
}

export default Modal