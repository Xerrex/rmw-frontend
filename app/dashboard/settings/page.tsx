"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useSettings, useUpdateSettings } from "./hooks/use-settings"
import { User, Car, Bell, Palette, ShieldCheck, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings()
  const updateSettings = useUpdateSettings()
  const { theme, setTheme } = useTheme()
  
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  if (isLoading || !formData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading settings...</p>
      </div>
    )
  }

  const handleSave = () => {
    updateSettings.mutate(formData)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and application configuration.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64">
            <TabsList className="flex flex-col h-auto bg-transparent p-0 gap-2 items-stretch">
              <TabsTrigger value="profile" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-none shadow-none">
                <User className="mr-3 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="vehicle" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-none shadow-none">
                <Car className="mr-3 h-4 w-4" />
                Vehicle Details
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-none shadow-none">
                <Bell className="mr-3 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-none shadow-none">
                <Palette className="mr-3 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-none shadow-none">
                <ShieldCheck className="mr-3 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </aside>

          <main className="flex-1 max-w-3xl">
            {/* Profile Section */}
            <TabsContent value="profile" className="mt-0">
              <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.profile.firstName} 
                        onChange={(e) => setFormData({...formData, profile: {...formData.profile, firstName: e.target.value}})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.profile.lastName} 
                        onChange={(e) => setFormData({...formData, profile: {...formData.profile, lastName: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.profile.email} 
                      onChange={(e) => setFormData({...formData, profile: {...formData.profile, email: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={formData.profile.phone} 
                      onChange={(e) => setFormData({...formData, profile: {...formData.profile, phone: e.target.value}})}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSave} disabled={updateSettings.isPending}>
                    {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Vehicle Section */}
            <TabsContent value="vehicle" className="mt-0">
              <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Vehicle Details</CardTitle>
                  <CardDescription>Manage the vehicle you use for ride-sharing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="plateNumber">Plate Number</Label>
                    <Input 
                      id="plateNumber" 
                      value={formData.vehicle.plateNumber} 
                      onChange={(e) => setFormData({...formData, vehicle: {...formData.vehicle, plateNumber: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Vehicle Model</Label>
                    <Input 
                      id="model" 
                      value={formData.vehicle.model} 
                      onChange={(e) => setFormData({...formData, vehicle: {...formData.vehicle, model: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seats">Total Seats</Label>
                    <Input 
                      id="seats" 
                      type="number" 
                      value={formData.vehicle.seats} 
                      onChange={(e) => setFormData({...formData, vehicle: {...formData.vehicle, seats: parseInt(e.target.value)}})}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSave} disabled={updateSettings.isPending}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
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
                      checked={formData.notifications.email} 
                      onCheckedChange={(checked) => setFormData({...formData, notifications: {...formData.notifications, email: checked}})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive real-time alerts on your device.</p>
                    </div>
                    <Switch 
                      checked={formData.notifications.push} 
                      onCheckedChange={(checked) => setFormData({...formData, notifications: {...formData.notifications, push: checked}})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive critical updates via text message.</p>
                    </div>
                    <Switch 
                      checked={formData.notifications.sms} 
                      onCheckedChange={(checked) => setFormData({...formData, notifications: {...formData.notifications, sms: checked}})}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button onClick={handleSave} disabled={updateSettings.isPending}>
                    Save Preferences
                  </Button>
                </CardFooter>
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

            {/* Security Section */}
            <TabsContent value="security" className="mt-0">
              <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Keep your account secure by managing your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </main>
        </div>
      </Tabs>
    </div>
  )
}
