import { useEffect } from 'react'

const useDocumentTitle = (title, prevailOnUnmount = false) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    return () => {
      if (!prevailOnUnmount) {
        document.title = prevTitle
      }
    }
  }, [title, prevailOnUnmount])
}

export default useDocumentTitle
