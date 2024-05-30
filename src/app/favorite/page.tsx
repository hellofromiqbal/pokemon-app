'use client'

import BackButton from '@/components/BackButton/BackButton'
import React from 'react'

export default function FavoritePage() {
  return (
    <div className="p-4 lg:px-0 flex flex-col gap-4">
      <BackButton/>
      <h1>Favorite</h1>
    </div>
  )
};
