import React from "react";
import Course from "./Course.jsx";
// import Course from "./Course";
import { useLoadUserQuery } from "@/redux/api/authApi.js"; 
import { Link } from "react-router-dom";

const MyLearning = () => { 
  const {data, isLoading} = useLoadUserQuery()
  console.log(data);
  const  myLearning = data?.user.enrolledCourses
  

  return (
    
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0 mt-20">
      <h1 className="font-bold text-4xl py-3">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Link to='/'><Course key={index} course={course}/></Link>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);