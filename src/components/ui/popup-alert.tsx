'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from './dialog'
import { Button } from './button'

export const PopupAlertContext = React.createContext({
  isOpen: false,
  setOpen: (_open: boolean) => {},
  handlePopup: (_value: { onSubmit: () => void; confirmText?: string; cancelText?: string }) => {},
  props: { onSubmit: () => {}, confirmText: 'ya', cancelText: 'tidak' }
})

export const PopupAlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [props, setProps] = useState({ onSubmit: () => {}, confirmText: 'ya', cancelText: 'tidak' })

  return (
    <PopupAlertContext.Provider
      value={{
        isOpen,
        setOpen: (_open: boolean) => {
          setIsOpen(_open)
        },
        handlePopup: (value: { onSubmit: () => void; confirmText?: string; cancelText?: string }) => {
          setProps({
            onSubmit: value.onSubmit,
            confirmText: value.confirmText || 'ya',
            cancelText: value.cancelText || 'tidak'
          })
        },
        props
      }}
    >
      {children}
      <PopupAlert />
    </PopupAlertContext.Provider>
  )
}

export const usePopupAlert = () => {
  const context = React.useContext(PopupAlertContext)

  if (context === undefined) {
    throw new Error('usePopupAlert must be used within a PopupAlertProvider')
  }

  return context
}

export default function PopupAlert() {
  const { isOpen, setOpen, props } = usePopupAlert()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle />
        <div className="flex flex-col items-center justify-center gap-2">
          <h5>Judul Hapus</h5>
          <div className="flex w-full gap-2">
            <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
              {props.cancelText}
            </Button>
            <Button className="w-full" onClick={props.onSubmit}>
              {props.confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
