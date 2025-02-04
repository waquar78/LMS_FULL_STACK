import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



const PURCHASE_API = "http://localhost:8000/api/v1/purchase/"

export const purchaseApi = createApi({
    reducerPath: "purchaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: PURCHASE_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        purchaseStatus: builder.mutation({
            query: (inputData) => ({
                url: "coursePurchase",
                method: "POST",

                body: inputData

            })

        }),
        getCourseDetailWithStatus: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/detail-with-status`,
                method: "GET",
            }),
        }),
        getPurchasedCourses: builder.query({
            query: () => ({
                url: `/`,
                method: "GET",
            }),
        }),
    })
})
export const { usePurchaseStatusMutation, useGetCourseDetailWithStatusQuery, useGetPurchasedCoursesQuery } = purchaseApi;