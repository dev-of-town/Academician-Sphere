import React from 'react'
import { useRouter } from 'next/navigation'


const CommunityPage = ({params}) => {
  return (
    <div>CommunityPage {params.communityname}</div>
  )
}

export default CommunityPage