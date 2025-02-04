import React from 'react'
import { Button } from './ui/button'
import {  Link, useNavigate, useParams } from 'react-router-dom'

const BuyCourseButton = ({courseId}) => {
  const navigate = useNavigate()




  return (
  
    <Button className="w-full" onClick={()=> navigate(`/payment/${courseId}`)} >Purchase Course</Button>
    
  )
}

export default BuyCourseButton
        