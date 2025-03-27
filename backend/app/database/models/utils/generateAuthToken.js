import jwt from 'jsonwebtoken'
import 'dotenv/config'

const generateAuthToken = (schema) => {
  schema.methods.generateAuthToken = async function () {
    // Clean up expired tokens
    this.tokens = this.tokens.filter((tokenObj) => {
      try {
        const decoded = jwt.verify(tokenObj.token, process.env.JWT_SECRET)
        return decoded.exp * 1000 > Date.now()
      } catch (error) {
        return false
      }
    })

    // Generate new token
    const token = jwt.sign({ _id: this._id.toString(), role: this.role }, process.env.JWT_SECRET, { expiresIn: '7 days' })

    // Add new token to tokens array
    this.tokens = this.tokens.concat({ token })

    await this.save()
    return token
  }
}

export default generateAuthToken