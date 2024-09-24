import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button } from './button'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface PasswordProps<T extends FieldValues> {
  control: Control<T>
  title: string
  name: Path<T>
}

export default function PasswordInput<T extends FieldValues>({ control, title, name }: PasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className={`absolute right-4 top-1/2 size-6 -translate-y-1/2 ${showPassword ? 'text-gray-500' : 'text-gray-700'}`}
                onClick={handleTogglePassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
              <Input placeholder="Password" type={showPassword ? 'text' : 'password'} {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
