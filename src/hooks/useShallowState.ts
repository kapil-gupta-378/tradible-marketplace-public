import { useMemo, useReducer, useRef } from 'react'

import { AnyObject } from 'interfaces'

/**
 * @description This state manager allows to store multiple keys just like
 * the old `this.setState()` from React Components.
 *
 * Any state updates are **shallowly merged** with the old state object,
 * replacing any old properties and keeping those that did not change.
 *
 * It also comes preloaded with few **utility functions** and a convenient
 * **stable reference** to an always-up-to-date state `refState` that can be used
 * inside `useCallback` or `useMemo` without triggering dependency changes.
 */

function useShallowState<S = AnyObject>(
  initialState: Partial<S> = {} as S
): [
  state: S,
  setState: typeof setState,
  utilityFunctions: {
    /** Sets all properties to `undefined`. */
    clearState: () => void
    /** Clears property value by setting it to `undefined`. */
    clearProperty: (property: keyof S) => void
    /** Sets all properties to the `initialState`. */
    resetState: () => void
    /** Sets property value to its `initialState`. */
    resetProperty: (property: keyof S) => void
  },
  /** Escape hatch to make life easier ¯\_(ツ)_/¯ */
  refState: { current: S }
] {
  const [state, setState] = useReducer(
    (prevState, action = {}) => ({ ...prevState, ...(typeof action === 'function' ? action(prevState) : action) }),
    initialState
  ) as [S, (action?: Partial<S> | ((state: S) => Partial<S>)) => void]

  const refState = useRef<S>(state)
  refState.current = state

  const utilityFunctions = useMemo(
    () => ({
      clearState() {
        setState(
          prevState =>
            Object.fromEntries(Object.keys(prevState as AnyObject).map(key => [key, undefined])) as {
              [key in keyof S]?: undefined
            }
        )
      },
      clearProperty(property: keyof S) {
        setState({ [property]: undefined } as Partial<S>)
      },
      resetState() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setState(
          prevState =>
            Object.fromEntries(
              Object.keys(prevState as AnyObject).map(key => [key, initialState[key as keyof S]])
            ) as typeof initialState
        )
      },
      resetProperty(property: keyof S) {
        setState({ [property]: initialState[property] } as Partial<S>)
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  /** All `setState`, `utilityFunctions` and its properties are **referentially stable**. */
  return [state, setState, utilityFunctions, refState]
}
export default useShallowState
