import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { InputField } from '../InputField'

describe('InputField', () => {
  it('associates label with input and shows helper', () => {
    render(<InputField label="Name" helperText="help" />)
    const input = screen.getByLabelText('Name')
    expect(input).toBeInTheDocument()
    expect(screen.getByText('help')).toBeInTheDocument()
  })

  it('shows error message when invalid', () => {
    render(<InputField label="X" invalid errorMessage="Nope" />)
    expect(screen.getByText('Nope')).toBeInTheDocument()
    const input = screen.getByLabelText('X')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('clear button wipes value', () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState('hello')
      return <InputField label="Y" value={val} onChange={(e) => setVal(e.target.value)} clearable/>
    }
    render(<Wrapper />)
    const input = screen.getByLabelText('Y') as HTMLInputElement
    expect(input.value).toBe('hello')
    const btn = screen.getByRole('button', { name: /clear input/i })
    fireEvent.click(btn)
    expect(input.value).toBe('')
  })
})
