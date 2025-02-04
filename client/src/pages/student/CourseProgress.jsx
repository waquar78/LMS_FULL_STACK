import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CirclePlay } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/redux/api/courseProgressApi.js';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseProgress = () => {
    const params = useParams();
    const courseId = params.courseId;
    const [currentLecture, setCurrentLecture] = useState(null);
    const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
    // console.log(data);
    
    const [updateLectureProgress] = useUpdateLectureProgressMutation();
    const [completeCourse, { data: completeData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
    const [inCompleteCourse, { data: inCompletedData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();


    // Handle course completion state changes (refetching data when success)
    useEffect(() => {
        if (completedSuccess) {
            refetch();
            toast.success(completeData.message);
        }
        if (inCompletedSuccess) {
            refetch();
            toast.success(inCompletedData.message);
        }
    }, [completedSuccess, inCompletedSuccess]);

    // Return loading or error states
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <h1>Failed to load the course</h1>;

    const { courseDetails, completed, progress } = data.data;
    const initialLecture = currentLecture || courseDetails.lectures && courseDetails.lectures[0];

    const lectureIndex = courseDetails.lectures.findIndex(
        (lec) => lec._id.toString() === (currentLecture ? currentLecture._id.toString() : initialLecture._id.toString())
    );

    const lectureNumber = lectureIndex + 1;
    const lectureTitle = courseDetails.lectures[lectureIndex]?.lectureTitle;

    // Check if a lecture is completed
    const isCompleted = (lectureId) => {
        return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
    };
    // Update lecture progress
    const handleLectureProgress = async (lectureId) => {
        await updateLectureProgress({ courseId, lectureId });
        refetch();
    };

    // Select a specific lecture
    const handleSelectLecture = (lecture) => {
        setCurrentLecture(lecture);
        handleLectureProgress(lecture._id)
    };


    // Mark course as complete or incomplete
    const handleCourseComplete = async () => {
        await completeCourse(courseId);
    
    };

    const handleCourseIncomplete = async () => {
        await inCompleteCourse(courseId);
        
    };

    return (
        <div className='max-w-7xl p-6 md:p-24 mx-auto'>
            {/* Display course name */}
            <div className='flex justify-between items-center mx-4'>
                <h1 className='text-2xl font-bold'>{courseDetails.courseTitle}</h1>
                <Button
                    onClick={completed? handleCourseIncomplete : handleCourseComplete}
                    variant={completed? "outline" : "default"}
                >
                    {completed ? "Completed" : "Mark as completed"}
                </Button>
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
                {/* Video section */}
                <div className='flex-1 md:w-3/5 h-fit shadow-lg rounded-lg p-4'>
                    <div>
                        <video
                            src={currentLecture?.videoUrl || initialLecture.videoUrl}
                            controls
                            onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
                            className='w-full h-auto md:rounded-lg'
                        />
                    </div>
                    <div className='mt-4'>
                        <h3 className='font-medium text-xl'>
                            {`Lecture: ${lectureNumber} - ${lectureTitle}`}
                        </h3>
                    </div>
                </div>

                {/* Lecture Sidebar */}
                <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0'>
                    <h2 className='font-semibold text-xl mb-4'>Course Lectures</h2>
                    <div className='flex-1 overflow-y-auto'>
                        {courseDetails?.lectures.map((lecture) => (
                            <Card
                                key={lecture._id}
                                className={`mb-4 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id ? `bg-gray-200` : `dark:bg-gray-600`}`}
                                onClick={() => handleSelectLecture(lecture)}
                            >
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className='flex items-center'>
                                        {isCompleted(lecture._id) ? (
                                            <CheckCircle2 size={24} className='text-green-500 mr-3' />
                                        ) : (
                                            <CirclePlay size={24} className='text-green-500 mr-3' />
                                        )}
                                    </div>
                                    <CardTitle className="text-xl font-medium">{lecture.lectureTitle}</CardTitle>
                                    {isCompleted(lecture._id) && (
                                        <Badge variant={'outline'} className="bg-gray-400 p-2">Completed</Badge>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;
