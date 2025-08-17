import type { Meta, StoryObj } from '@storybook/react'
import { InputField, type InputFieldProps } from './InputField'
import React from 'react'

const meta: Meta<typeof InputField> = {
  title: 'UI/InputField',
  component: InputField,
  args: {
    label: 'Label',
    placeholder: 'Enter text',
    helperText: 'Helper goes here',
    variant: 'outlined',
    size: 'md'
  }
}
export default meta
type Story = StoryObj<typeof InputField>

export const Basic: Story = {}

export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: 'This field is required.'
  }
}

export const Loading: Story = {
  args: {
    loading: true
  }
}

export const PasswordWithToggle: Story = {
  args: {
    type: 'password',
    passwordToggle: true,
    label: 'Password'
  }
}

export const Variants: Story = {
  render: (args: InputFieldProps) => (
    <div className="space-y-4 w-80">
      <InputField {...args} variant="outlined" label="Outlined"/>
      <InputField {...args} variant="filled" label="Filled"/>
      <InputField {...args} variant="ghost" label="Ghost"/>
    </div>
  )
}

export const Sizes: Story = {
  render: (args: InputFieldProps) => (
    <div className="space-y-4 w-80">
      <InputField {...args} size="sm" label="Small"/>
      <InputField {...args} size="md" label="Medium"/>
      <InputField {...args} size="lg" label="Large"/>
    </div>
  )
}
