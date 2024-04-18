import { useCallback, useState } from 'react'
import Input from '.'

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'form-input',
    },
    name: {
      control: 'text',
      defaultValue: 'value',
    },
    label: {
      control: 'text',
      defaultValue: 'FormInput',
    },
    value: {
      control: 'text',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Welcome to ClubRare',
    },
    error: {
      control: 'text',
      defaultValue: '',
    },
    type: {
      options: ['text', 'email', 'password', 'number'],
      defaultValue: 'text',
      table: {
        disable: true,
      },
    },
    variant: {
      control: 'select',
      options: ['primary'],
      defaultValue: 'primary',
    },
    autoFocus: {
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export const Default = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const handleChangeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  return (
    <Input
      placeholder="Search by collection, item and user"
      className="rounded-lg border border-neutral-600 p-3 hover:border-neutral-700 dark:border-neutral-light-600"
      type="text"
      value={searchTerm}
      variant="primary"
      onChange={handleChangeSearch}
    />
  )
}
