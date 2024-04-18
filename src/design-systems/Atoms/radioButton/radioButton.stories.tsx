import { useState } from 'react'
import { RadioButton } from '.'

export default {
  title: 'Atoms/Radio',
  component: RadioButton,
}

export const Default = () => {
  const [selectedRadio, setSelectedRadio] = useState<string>('radio-1')

  const onRadioChange = (id: string) => {
    setSelectedRadio(id)
  }

  return (
    <div>
      <RadioButton
        label="Radio Button 1"
        id="radio-1"
        checked={selectedRadio === 'radio-1'}
        onChange={() => onRadioChange('radio-1')}
      />
      <RadioButton
        label="Radio Button 1"
        id="radio-2"
        checked={selectedRadio === 'radio-2'}
        onChange={() => onRadioChange('radio-2')}
      />
    </div>
  )
}
