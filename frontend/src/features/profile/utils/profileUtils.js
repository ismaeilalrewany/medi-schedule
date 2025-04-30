export function getInitialModalValue(field, currentUser) {
  return currentUser && field ? currentUser[field] : ''
}
