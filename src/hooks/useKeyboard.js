import { useEffect } from 'react'

export function useKeyboard(callback) {
  useEffect(() => {
    function handle(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        callback()
      }
    }

    window.addEventListener('keydown', handle)

    return () => window.removeEventListener('keydown', handle)
  }, [callback])
}