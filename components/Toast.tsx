"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-md border border-neutral-200 bg-white px-4 py-2 shadow-lg">
        <p className="text-sm text-neutral-900">{message}</p>
      </div>
    </div>
  )
}
