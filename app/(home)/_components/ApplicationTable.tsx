'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { API_URL, Application, Delete } from '@/constant/Constants'
import toast from 'react-hot-toast'

const ApplicationTable = ({ type }: { type?: string }) => {
  const [data, setData] = useState<Application[]>([])
  const [search, setSearch] = useState<string>("");

  const keys: (keyof Application)[] = ["fullName", "email", "collegeName", "type"]

  const searching = (data: Application[], search: string): Application[] => {
    return data?.filter((item: Application) =>
      keys.some((key) => {
        const value = item[key]
        if (typeof value === "string") {
          return value.toLowerCase().includes(search.toLowerCase())
        } else if (value != null) {
          return value.toString().toLowerCase().includes(search.toLowerCase())
        }
        return false
      })
    )
  }

  const userData = (type?: string) => {
    axios.get(`${API_URL}/api/application`)
      .then((response) => {
        let filtered: Application[] = response?.data?.applications || []

        if (type) {
          filtered = filtered.filter((app: Application) =>
            decodeURIComponent(app?.type).includes(type)
          )
        }

        setData(filtered)
        console.log("User data fetched successfully:", filtered)
        toast.success("User data fetched successfully")
      })
      .catch((error) => {
        console.error("Error fetching user data:", error)
        toast.error("Error fetching user data")
      })
  }

  useEffect(() => {
    userData(type === 'All' ? undefined : type)
  }, [type])

  return (
    <div className='w-full'>
      <p className='text-white'>{data.length} applications found of type - {type}</p>
      <input
        type="text"
        className="bg-slate-50 py-1 px-2 rounded-md"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table className='text-white w-full'>
        <TableCaption>List of your recent applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Application No.</TableHead>
            <TableHead className="text-white">User</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searching(data, search).map((application: Application, index: number) => (
            <TableRow key={application._id ?? index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{application?.fullName}</TableCell>
              <TableCell>{application?.email}</TableCell>
              <TableCell>{decodeURIComponent(application?.type)}</TableCell>
              <TableCell
                className="text-center bg-red-500 cursor-pointer"
                onClick={() => Delete(`${API_URL}/api/application`, application?._id)}
              >
                Delete
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicationTable