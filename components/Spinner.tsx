import React from 'react'

const Spinner = ({ color = 'border-blue-500' }: { color?: string }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`}
      ></div>
    </div>
  )
}

export default Spinner
