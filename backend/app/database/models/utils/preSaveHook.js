import bcrypt from 'bcryptjs'

const preSaveHook = (schema) => {
  schema.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
      }
      next()
    } catch (error) {
      next(error)
    }
  })
}

export default preSaveHook