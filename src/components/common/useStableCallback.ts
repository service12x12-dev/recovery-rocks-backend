import { useCallback, useRef } from 'react'

function useStableCallback<T extends (...args: never[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T>
function useStableCallback<T extends (this: object, ...args: never[]) => unknown>(
  fn?: T,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>
function useStableCallback<T extends (this: object, ...args: never[]) => unknown>(
  fn?: T,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> {
  const fnRef = useRef(fn)
  fnRef.current = fn
  return useCallback(function wrap(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> {
    return fnRef.current?.apply(this, args) as ReturnType<T>
  }, [])
}

export default useStableCallback
