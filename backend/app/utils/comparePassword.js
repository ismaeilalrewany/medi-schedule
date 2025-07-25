import bcrypt from 'bcryptjs'

const comparePassword = async function (inputPassword, hashedPassword) {
  try {
    return bcrypt.compareSync(inputPassword, hashedPassword)
  } catch (error) {
    throw new Error('Error comparing passwords')
  }
}

export default comparePassword
