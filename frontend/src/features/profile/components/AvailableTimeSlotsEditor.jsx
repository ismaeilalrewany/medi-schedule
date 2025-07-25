import { useState, useEffect } from 'react'

const AvailableTimeSlotsEditor = ({ initialSlots = [], onSave, onCancel }) => {
  const [editingSlotIndex, setEditingSlotIndex] = useState(null)
  const [editingSlot, setEditingSlot] = useState(null)
  const [slotRemoved, setSlotRemoved] = useState(false)
  const [tempSlots, setTempSlots] = useState([])

  useEffect(() => {
    setTempSlots(initialSlots ? [...initialSlots] : [])
  }, [initialSlots])

  const openSlotEditModal = (slot, idx) => {
    setEditingSlotIndex(idx)
    setEditingSlot({ ...slot })
    setSlotRemoved(false)
  }

  const handleSaveSlot = () => {
    if (slotRemoved) {
      const updated = tempSlots.filter((_, i) => i !== editingSlotIndex)
      setTempSlots(updated)
    } else {
      const updated = tempSlots.map((slot, i) => (i === editingSlotIndex ? editingSlot : slot))
      setTempSlots(updated)
    }
    setEditingSlotIndex(null)
    setEditingSlot(null)
    setSlotRemoved(false)
  }

  const handleCancelSlot = () => {
    setEditingSlotIndex(null)
    setEditingSlot(null)
    setSlotRemoved(false)
  }

  const handleRemoveSlot = () => {
    setSlotRemoved(true)
  }

  const handleAddSlot = () => {
    setTempSlots([
      ...tempSlots,
      { day: 'monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    ])
  }

  const handleSaveAllSlots = () => {
    if (onSave) onSave(tempSlots)
  }

  return (
    <>
      {editingSlotIndex === null ? (
        <>
          <div className="py-4">
            <h4 className="text-sm font-medium text-neutral/80 mb-1">Available Time Slots</h4>
            <button
              type="button"
              className="btn btn-outline btn-sm mb-4 w-full"
              onClick={handleAddSlot}
            >
              Add Time Slot
            </button>
            <div className="available-time-items-wrapper border border-neutral/20 rounded-md overflow-hidden bg-base-100">
              {tempSlots && tempSlots.length > 0 ? (
                tempSlots.map((slot, idx) => (
                  <div
                    key={slot._id || idx}
                    className="available-time-item block relative p-4 border-b border-neutral/20 last:border-b-0 hover:bg-neutral/5 transition-colors duration-150 cursor-pointer pr-10"
                    onClick={() => openSlotEditModal(slot, idx)}
                  >
                    <p className="item-label text-neutral text-sm">
                      <span className="border rounded-2xl px-2 py-1 mr-2">{slot.day}</span>
                      <span className="border rounded-2xl px-2 py-1 mr-2">
                        {slot.startTime} - {slot.endTime}
                      </span>
                      <span
                        className={`border rounded-2xl px-2 py-1 mr-2 ${slot.isAvailable ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}
                      >
                        {slot.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </p>
                    <i className="fa-solid fa-chevron-right item-chevron absolute top-1/2 right-4 -translate-y-1/2 text-neutral/40"></i>
                  </div>
                ))
              ) : (
                <div className="p-4 text-neutral/60">No available time slots.</div>
              )}
            </div>
          </div>
          <div className="modal-action mt-4 pt-4 border-t border-neutral/20">
            <button className="btn btn-ghost text-neutral/80" onClick={onCancel}>
              Cancel
            </button>
            <button
              className="btn bg-neutral text-neutral-content border-0"
              onClick={handleSaveAllSlots}
            >
              Save Changes
            </button>
          </div>
        </>
      ) : (
        <>
          {slotRemoved ? (
            <>
              <div className="py-4 text-center text-neutral">This time slot has been removed.</div>
              <div className="modal-action mt-4 pt-4 border-t border-neutral/20 flex justify-end gap-2">
                <button className="btn btn-ghost text-neutral/80" onClick={handleCancelSlot}>
                  Cancel
                </button>
                <button
                  className="btn bg-neutral text-neutral-content border-0"
                  onClick={handleSaveSlot}
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : editingSlot ? (
            <>
              <div className="form-control py-4">
                <label className="label block mb-2">
                  <span className="label-text font-bold">Edit Slot</span>
                </label>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <select
                    className="select select-bordered col-span-2 w-full"
                    value={editingSlot.day}
                    onChange={e => setEditingSlot({ ...editingSlot, day: e.target.value })}
                  >
                    {[
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ].map(day => (
                      <option key={day} value={day.toLowerCase()}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2 col-span-2">
                    <input
                      type="time"
                      className="input input-bordered"
                      value={editingSlot.startTime}
                      onChange={e => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
                    />
                    <span className="self-center">to</span>
                    <input
                      type="time"
                      className="input input-bordered"
                      value={editingSlot.endTime}
                      onChange={e => setEditingSlot({ ...editingSlot, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4 justify-between">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-neutral"
                      checked={editingSlot.isAvailable}
                      onChange={e =>
                        setEditingSlot({ ...editingSlot, isAvailable: e.target.checked })
                      }
                    />
                    <span className="label-text">Available</span>
                  </label>
                  <button
                    type="button"
                    className="btn btn-neutral btn-sm"
                    onClick={handleRemoveSlot}
                  >
                    Remove Slot
                  </button>
                </div>
              </div>
              <div className="modal-action mt-4 pt-4 border-t border-neutral/20 flex justify-end gap-2">
                <button className="btn btn-ghost text-neutral/80" onClick={handleCancelSlot}>
                  Cancel
                </button>
                <button
                  className="btn bg-neutral text-neutral-content border-0"
                  onClick={handleSaveSlot}
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  )
}

export default AvailableTimeSlotsEditor
