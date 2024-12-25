import { useEffect, useState } from "react";
import {getAllUsers,lockUser, unlockUser }  from "../../api/UserAPI.js";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/astoms/table.js";
import { Search } from "lucide-react";
import { Input } from "../../components/astoms/input.js";
import { Button } from "../../components/astoms/button.js";

interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string | null;
  role: string;
  dateOfBirth: string;
  status: number;
}

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      if (data) setUsers(data);
    };
    fetchUsers();
  }, []);

  const toggleLockStatus = async (userId, currentStatus) => {  
    try {  
      // Set the confirmation message based on the current status  
      const confirmMessage = currentStatus === 1   
        ? 'Are you sure you want to lock this user?'   
        : 'Are you sure you want to unlock this user?';  
      
      const confirmAction = window.confirm(confirmMessage);  
      
      if (confirmAction) {  
        if (currentStatus === 0) {  
          const unlockStatus = await unlockUser(userId);  
          getAllUsers(unlockStatus);
          alert("User unlocked successfully.");  
        } else {  
          const lockStatus =  await lockUser(userId);  
          getAllUsers(lockStatus);
          alert("User locked successfully.");  
        }  
        getAllUsers(); // Refresh the user list after the action  
      }      
    } catch (error) {  
      console.error(error);  
      alert("Failed to update user status.");  
    }  
  };  

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.dateOfBirth?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">ID</TableHead>
            <TableHead className="font-bold">Tên đăng nhập</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="text-right font-bold">Số điện thoại</TableHead>
            <TableHead className="text-right font-bold">Quyền</TableHead>
            <TableHead className="text-right font-bold">Ngày sinh</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">
                {user.phoneNumber || "N/A"}
              </TableCell>
              <TableCell className="text-right">{user.role}</TableCell>
              <TableCell className="text-right">
                {user.dateOfBirth !== "N/A"
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  onClick={() => toggleLockStatus(user.id, user.status)}
                >
                  {user.status === 1 ? "Lock" : "Unlock"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
