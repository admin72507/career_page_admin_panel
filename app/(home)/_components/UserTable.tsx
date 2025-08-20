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
import { API_URL } from '@/constant/Constants'
import toast from 'react-hot-toast'

const UserTable = ({type}:{type?: string}) => {

    const [data, setData] = useState<any>()


    const userData = (type?: string) => {
        axios.get(`${API_URL}/api/user`)
            .then((response) => {
                let filtered = response.data.users;

                // filter by type if provided
                if (type) {
                    filtered = filtered.filter((user: any) =>
                        Array.isArray(user.type)
                            ? user.type.some((t: string) => decodeURIComponent(t).includes(type))
                            : decodeURIComponent(user.type).includes(type)
                    );
                }

                setData({ users: filtered });
                console.log("User data fetched successfully:", filtered);
                toast.success("User data fetched successfully");
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data");
            });
    };

    useEffect(() => {
        userData(type === 'All' ? undefined : type);
    }, [type]);

    return (
        <div className='w-full'>
            <p className='text-white'>{data?.users.length}.: users found In type - {type}</p>
            <Table className='text-white w-full'>
                <TableCaption>List of your recent users.</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead className="w-[100px] text-white">User No.</TableHead>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-white">Role</TableHead>
                        <TableHead className="text-right text-white">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.users.map((user: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{user.FirstName} {user.LastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {Array.isArray(user.type) ? user.type.join(", ") : user.type}
                            </TableCell>
                            <TableCell className="text-center bg-red-600">Delete</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default UserTable
