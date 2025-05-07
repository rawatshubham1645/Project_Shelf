
import { Loader2 } from 'lucide-react'
import React from 'react'

function UtilLoading() {
  return (
    <div className='flex items-center justify-center w-full h-96'>
    <Loader2 className="h-10 w-10 text-primary animate-spin" />
    </div>

  )
}

export default UtilLoading