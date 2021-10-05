import { useRef, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useMounted = () => {
  const mountRef = useRef(true)
  useEffect(() => {
    mountRef.current = false
  }, [])
  return mountRef.current
}

export const useError = (error: string, fn: (() => void) | null = null) => {
  useEffect(() => {
    if (!error) return
    toast.warn(error)
    if (fn) fn()
  }, [error, fn])
}
