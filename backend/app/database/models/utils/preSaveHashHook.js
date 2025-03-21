import bcrypt from 'bcryptjs'
import 'dotenv/config'

const preSaveHashHook = (schema) => {
  schema.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, process.env.HASH_SALT)
      }
      next()
    } catch (error) {
      next(error)
    }
  })
}

export default preSaveHashHook