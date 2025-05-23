import React from 'react'

const SectionGridSkeleton = () => {
  return (
    <div>
        <div className="h-8 w-48 bg-zinc-800 rounded animate-bounce mb-4"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({length:4}).map((_,i)=>(
             <div key={i} className='bg-zinc-800/50 rounded-md animate-pulse'>
                <div className="aspect-square rounded-md bg-zinc-700 mb-4"/>
                <div className='h-4 bg-zinc-700 rounded w-3/4 mb-2' />
						<div className='h-4 bg-zinc-700 rounded w-1/2' />
             </div>
            ))}
        </div>
    </div>
  )
}

export default SectionGridSkeleton