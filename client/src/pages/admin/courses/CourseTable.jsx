import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {  useGetCreatorCoursesQuery } from '@/redux/api/courseApi'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


const CourseTable = () => {
  const navigate = useNavigate()

  const {data, isLoading} = useGetCreatorCoursesQuery()
  console.log(data);
  
  
    if(isLoading) return <h1>Loading....</h1>
   
  
  return (
    <div className='m-24'>
        <Button className="mb-4" onClick={() => navigate(`create`)}>Create new courses</Button>
     <Table>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.courses.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
            <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="text-right">
            <Button size='sm' variant='ghost'  onClick={()=>navigate(`${course._id}`)} ><Edit/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}

export default CourseTable
