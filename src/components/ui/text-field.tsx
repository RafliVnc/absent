import React from 'react'
import { Input, InputProps } from './input'

export interface TextFieldProps extends InputProps {
  helperText?: string
}

export default function TextField({ helperText, ...props }: TextFieldProps) {
  return (
    <>
      <Input {...props} /> <p className="text-sm font-medium text-destructive">{helperText}</p>
    </>
  )
}
