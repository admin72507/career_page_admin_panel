import axios from "axios";
import toast from "react-hot-toast";

export const API_URL = "https://career-server-olive.vercel.app";

// types.ts

export interface Application {
  _id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  currentCity: string;
  permanentAddress: string;
  nationality: string;
  passportPhotoUrl: string;
  collegeName: string;
  degreeStream: string;
  currentYear: string;
  enrollmentNumber: string;
  graduationYear: string;
  cgpa: string;
  coursework: string;
  isFresher: string;
  internshipExperience: string;
  internshipDetails: string;
  resumeUrl: string;
  coverLetterUrl: string;
  portfolioUrl: string;
  videoResumeUrl: string;
  other: string;
  aiProjects: string;
  toolsFrameworks: string;
  projectLinks: string;
  availableForInternship: string;
  preferredMode: string;
  commitRounds: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  FirstName: string;
  LastName: string;
  email: string;
  type: string[]; // ✅ matches your schema
}

//delete function

export const Delete =async (api:string, id:string)=>{
  axios.delete(`${api}/${id}`).then((res)=>{
    console.log("Deleted successfully:", res.data);
    toast.success("Data Deleted Successfully");
  }).catch((error)=>{
    console.log("Error deleting data:", error);
    toast.error("Error deleting data");
  });
}
