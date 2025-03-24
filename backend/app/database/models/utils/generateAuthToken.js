import jwt from 'jsonwebtoken'
import 'dotenv/config'

const generateAuthToken = (schema) => {
  schema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString(), role: this.role }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
  }
}

export default generateAuthToken