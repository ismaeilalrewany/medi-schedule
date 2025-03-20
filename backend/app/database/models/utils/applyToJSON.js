const applyToJSON = (schema, removeFields = ['__v', 'password', 'tokens']) => {
  schema.methods.toJSON = function () {
    const document = this.toObject()
    removeFields.forEach(field => delete document[field])
    
    // Transform _id to id
    document.id = document._id
    delete document._id
    
    return document
  }
}

export default applyToJSON