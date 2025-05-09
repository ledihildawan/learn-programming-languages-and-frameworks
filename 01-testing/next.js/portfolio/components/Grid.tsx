import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'

const Grid = () => {
  return (
    <div id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map((props) => (
          <BentoGridItem key={props.id} {...props} />
        ))}
      </BentoGrid>
    </div>
  )
}

export default Grid
