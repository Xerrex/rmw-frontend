"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuthContext } from "@/app/(auth)/AuthContext"
import { useManagementUsers, ManagedUserRole } from "./hooks/use-management-users"

const ROLE_OPTIONS: ManagedUserRole[] = ["user", "staff", "admin"]

export default function ManagementUsersPage() {
  const { user: currentUser } = useAuthContext()
  const { users, isLoading, updateRole, isUpdatingRole } = useManagementUsers()
  const isAdmin = currentUser?.role === "admin"

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          User Access
        </h1>
        <p className="text-muted-foreground mt-1">
          Review app users and manage who has staff or admin access.
        </p>
      </div>

      <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            {isAdmin
              ? "Change a user's role to grant or revoke management access."
              : "Only admins can change a user's role."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  {isAdmin && <TableHead className="text-right">Access</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((managedUser) => (
                  <TableRow key={managedUser.uuid}>
                    <TableCell className="font-medium">
                      {managedUser.first_name} {managedUser.last_name}
                    </TableCell>
                    <TableCell>{managedUser.email}</TableCell>
                    <TableCell>
                      <Badge variant={managedUser.role === "admin" ? "default" : "secondary"}>
                        {managedUser.role}
                      </Badge>
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <Select
                          value={managedUser.role}
                          disabled={isUpdatingRole || managedUser.email === currentUser?.email}
                          onValueChange={(role) =>
                            updateRole({ uuid: managedUser.uuid, role: role as ManagedUserRole })
                          }
                        >
                          <SelectTrigger className="ml-auto w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_OPTIONS.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
