import React, { useState } from 'react'

import { ToggleTypes } from './interface'

import useToggle from 'hooks/useToggle'

const Toggle: React.FC<ToggleTypes> = ({ onChange }) => {
  const [istoggled, , turntoggled] = useToggle(false)

  const handleChange = () => {
    turntoggled(!istoggled)
    onChange?.(!istoggled)
  }

  return (
    <>
      <div className="flex items-center">
        <input
          checked={istoggled}
          className="toggle-switch-checkbox hidden"
          id="toggle-switch"
          type="checkbox"
          onChange={handleChange}
        />
        <label
          className={`block h-5 w-10 cursor-pointer overflow-hidden rounded-full transition duration-300 ease-in-out ${
            istoggled ? 'bg-black dark:bg-white ' : 'bg-[#0000001a] dark:bg-neutral-light-1100'
          } `}
          htmlFor="toggle-switch"
        >
          <span
            className={`block h-3 w-3  ${
              istoggled ? 'bg-white  dark:bg-neutral-custom-black ' : 'bg-neutral-custom-black dark:bg-white'
            } relative top-1 transform rounded-full shadow transition duration-300 ease-in-out ${
              istoggled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </label>
      </div>
    </>
  )
}

export default Toggle
