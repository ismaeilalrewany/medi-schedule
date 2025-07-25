import bcrypt from 'bcryptjs'
import 'dotenv/config'

const preSaveHashHook = schema => {
  schema.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(Number(process.env.HASH_SALT))
        this.password = bcrypt.hashSync(this.password, salt)
      }
      next()
    } catch (error) {
      next(error)
    }
  })
}

export default preSaveHashHook
