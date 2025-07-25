const AvailableTimeSlots = ({ timeSlots, setTimeSlots }) => {
  const addTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      {
        day: 'monday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true,
      },
    ])
  }

  const updateSlot = (index, field, value) => {
    const updated = [...timeSlots]
    updated[index][field] = value
    setTimeSlots(updated)
  }

  return (
    <div className="form-control">
      <label className="label block mb-2">
        <span className="label-text font-bold">Available Time Slots</span>
      </label>
      {timeSlots.map((slot, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <select
              className="select select-bordered col-span-2"
              value={slot.day}
              onChange={e => updateSlot(index, 'day', e.target.value)}
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                day => (
                  <option key={day} value={day.toLowerCase()}>
                    {day}
                  </option>
                )
              )}
            </select>
            <div className="flex gap-2 col-span-2">
              <input
                type="time"
                className="input input-bordered"
                value={slot.startTime}
                onChange={e => updateSlot(index, 'startTime', e.target.value)}
              />
              <span className="self-center">to</span>
              <input
                type="time"
                className="input input-bordered"
                value={slot.endTime}
                onChange={e => updateSlot(index, 'endTime', e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center mt-4 justify-between">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-neutral"
                checked={slot.isAvailable}
                onChange={e => updateSlot(index, 'isAvailable', e.target.checked)}
              />
              <span className="label-text">Available</span>
            </label>
            <button
              type="button"
              className="btn btn-neutral btn-sm"
              onClick={() => setTimeSlots(timeSlots.filter((_, i) => i !== index))}
            >
              Remove Slot
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-outline btn-sm mt-2" onClick={addTimeSlot}>
        Add Time Slot
      </button>
    </div>
  )
}

export default AvailableTimeSlots
