"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  useUserProfile,
  useUserVehicles,
  useCreateVehicle,
  useDeleteVehicle,
  useChangePassword,
} from "./hooks/use-settings"
import { User, Car, Bell, Palette, ShieldCheck, Loader2, Plus, Trash2, CarFront } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { data: profile, isLoading: isProfileLoading } = useUserProfile()
  const { data: vehicles, isLoading: isVehiclesLoading } = useUserVehicles()
  const createVehicle = useCreateVehicle()
  const deleteVehicle = useDeleteVehicle()
  const changePassword = useChangePassword()
  const { theme, setTheme } = useTheme()

  // Vehicle Dialog State
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)
  const [newVehiclePlate, setNewVehiclePlate] = useState("")
  const [newVehicleModel, setNewVehicleModel] = useState("")
  const [newVehicleSeats, setNewVehicleSeats] = useState(4)

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isConfirmPasswordDialogOpen, setIsConfirmPasswordDialogOpen] = useState(false)

  // Notifications dummy state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })

  // Handle Create Vehicle
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVehiclePlate.trim() || !newVehicleModel.trim()) {
      toast.error("Please fill in both plate number and vehicle model.")
      return
    }
    try {
      await createVehicle.mutateAsync({
        vehicle_plate: newVehiclePlate,
        vehicle_model: newVehicleModel,
        seats: newVehicleSeats,
      })
      toast.success("Vehicle added successfully")
      setIsAddVehicleOpen(false)
      setNewVehiclePlate("")
      setNewVehicleModel("")
      setNewVehicleSeats(4)
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { detail?: string } } }
      const msg = errorObj.response?.data?.detail || "Failed to add vehicle"
      toast.error(typeof msg === "string" ? msg : "Failed to add vehicle")
    }
  }

  // Handle Delete Vehicle
  const handleDeleteVehicle = async (vehicleId: number) => {
    try {
      await deleteVehicle.mutateAsync(vehicleId)
      toast.success("Vehicle deleted successfully")
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { detail?: string } } }
      const msg = errorObj.response?.data?.detail || "Failed to delete vehicle"
      toast.error(typeof msg === "string" ? msg : "Failed to delete vehicle")
    }
  }

  // Handle Password Submit Trigger
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword) {
      toast.error("Please enter current and new password.")
      return
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.")
      return
    }
    setIsConfirmPasswordDialogOpen(true)
  }

  // Confirm Password Change
  const handleConfirmChangePassword = async () => {
    try {
      await changePassword.mutateAsync({
        current_password: currentPassword,
        new_password: newPassword,
      })
      toast.success("Password updated successfully!")
      setIsConfirmPasswordDialogOpen(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { detail?: string } } }
      const msg = errorObj.response?.data?.detail || "Failed to update password"
      toast.error(typeof msg === "string" ? msg : "Failed to update password")
    }
  }

  if (isProfileLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 py-10 backdrop-blur sm:px-6 lg:px-8 mb-5">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1 pb-2">
            Manage your account preferences and application configuration.
          </p>
        </div>
      </header>

      <Tabs defaultValue="profile" className="w-full space-y-6">
        <TabsList className="h-auto w-full gap-1.5 rounded-xl bg-muted/60 p-1.5">
          <TabsTrigger
            value="profile"
            className="h-10 flex-1 min-w-30 justify-center px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="vehicle"
            className="h-10 flex-1 min-w-35 justify-center px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
          >
            <Car className="mr-2 h-4 w-4" />
            Vehicle Details
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="h-10 flex-1 min-w-35 justify-center px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="h-10 flex-1 min-w-32 justify-center px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
          >
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="h-10 flex-1 min-w-30 justify-center px-4 text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Section - Requirement 3 */}
        <TabsContent value="profile" className="mt-0">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your personal details. These fields are read-only.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={profile?.first_name || ""} disabled className="bg-muted/50 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={profile?.last_name || ""} disabled className="bg-muted/50 cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={profile?.email || ""} disabled className="bg-muted/50 cursor-not-allowed" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicle Section - Requirement 4 & 5 */}
        <TabsContent value="vehicle" className="mt-0">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>Manage the vehicles you use for ride-sharing.</CardDescription>
              </div>
              <Button onClick={() => setIsAddVehicleOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" /> Add Vehicle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isVehiclesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : !vehicles || vehicles.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No vehicles registered yet. Click &quot;Add Vehicle&quot; to register one.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-border bg-background shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                          <CarFront className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{v.vehicle_plate}</p>
                          <p className="text-xs text-muted-foreground">
                            {v.vehicle_model} • {v.seats} seats
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteVehicle(v.id)}
                        disabled={deleteVehicle.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Vehicle Dialog - Requirement 8: onInteractOutside */}
          <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
            <DialogContent
              className="sm:max-w-md"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Register a vehicle to select when creating rides.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVehicle} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="vPlate">Plate Number</Label>
                  <Input
                    id="vPlate"
                    placeholder="e.g. KDA 123X"
                    value={newVehiclePlate}
                    onChange={(e) => setNewVehiclePlate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vModel">Vehicle Model</Label>
                  <Input
                    id="vModel"
                    placeholder="e.g. Toyota Fielder"
                    value={newVehicleModel}
                    onChange={(e) => setNewVehicleModel(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vSeats">Available Seats</Label>
                  <Input
                    id="vSeats"
                    type="number"
                    min={1}
                    value={newVehicleSeats}
                    onChange={(e) => setNewVehicleSeats(parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddVehicleOpen(false)}
                    disabled={createVehicle.isPending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createVehicle.isPending}>
                    {createVehicle.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Vehicle
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Notifications Section */}
        <TabsContent value="notifications" className="mt-0">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about ride updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about ride requests via email.</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive real-time alerts on your device.</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive critical updates via text message.</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Section */}
        <TabsContent value="appearance" className="mt-0">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the visual theme of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Theme Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Section - Requirement 6 */}
        <TabsContent value="security" className="mt-0">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Keep your account secure by managing your password.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Password Change Confirmation Dialog - Requirement 6 & 8 */}
          <Dialog
            open={isConfirmPasswordDialogOpen}
            onOpenChange={setIsConfirmPasswordDialogOpen}
          >
            <DialogContent
              className="sm:max-w-md"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Confirm Password Change</DialogTitle>
                <DialogDescription>
                  Are you sure you want to update your account password? You will need to use your new password next time you sign in.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsConfirmPasswordDialogOpen(false)}
                  disabled={changePassword.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirmChangePassword}
                  disabled={changePassword.isPending}
                >
                  {changePassword.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirm Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}
