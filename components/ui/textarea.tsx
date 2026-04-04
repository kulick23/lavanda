import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'block min-h-32 w-full rounded-xl border border-[#d9cdea] bg-white px-4 py-3 text-[15px] font-medium leading-6 text-[#2D2A3E] shadow-none transition-[color,box-shadow,border-color] outline-none placeholder:text-[#9f92b5] focus-visible:border-[#8b63c5] focus-visible:ring-[3px] focus-visible:ring-[#9B6DD4]/15 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
