# RideShare Frontend

A modern, responsive ride-sharing application built with React 19, Vite, TypeScript, Ant Design, and Tailwind CSS.

## Features

✨ **Core Features**
- 🚗 Create and share rides with flexible route customization
- 👥 Request to join rides and indicate pickup/drop-off locations
- 🗺️ Route validation - pickup and drop-off locations must be within the ride's route
- 💳 Transparent pricing and cost-sharing
- ✅ Request management system for ride acceptance/rejection

✨ **User Interface**
- 🎨 Professional color scheme (Primary: Blue, Secondary: Teal, Accent: Orange)
- 🌓 Dark/Light mode toggle with system preference detection
- 📱 Fully responsive design for mobile, tablet, and desktop
- ⚡ Fast performance with React Query for data fetching
- 🎯 Intuitive navigation and user-friendly forms

## Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite 8** - Build tool and dev server
- **TypeScript 6** - Type safety
- **Ant Design 5** - Component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **React Query (TanStack)** - Data fetching and state management
- **Axios** - HTTP client
- **dayjs** - Date manipulation

## Project Structure

```
src/
├── config/
│   └── theme.ts           # Color scheme and Ant Design configuration
├── contexts/
│   └── ThemeContext.tsx    # Theme provider (light/dark mode)
├── hooks/
│   ├── useAuth.ts         # Authentication hooks
│   ├── useRides.ts        # Ride management hooks
│   └── useJoinRequests.ts # Join request hooks
├── pages/
│   ├── LandingPage.tsx
│   ├── DashboardPage.tsx
│   ├── AvailableRidesPage.tsx
│   ├── JoinRequestsPage.tsx
│   └── CreateRidePage.tsx
├── components/
│   ├── Auth/
│   ├── Layout/
│   └── ThemeToggle/
├── services/
│   └── apiClient.ts
├── types/
│   └── common.ts
└── lib/
    └── queryClient.ts
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create `.env` file:
```bash
cp .env.example .env
```

Update API URL:
```
VITE_API_URL=http://localhost:8000/api
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Color Scheme

**Light Mode:**
- Primary: Blue (#1976D2)
- Secondary: Teal (#00BCD4)
- Accent: Orange (#FF9800)

**Dark Mode:** Auto-adjusted colors for visibility

## Dark Mode

- Toggle between light/dark modes
- Follow system preference
- Persistent user preference
- Smooth transitions

## Responsive Design

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 🖥️ Desktop (1024px+)

## API Hooks

### useAuth.ts
- `useLogin()` - Login user
- `useSignUp()` - Register user
- `useLogout()` - Logout user
- `useCurrentUser()` - Get current user
- `useRefreshToken()` - Refresh token

### useRides.ts
- `useAvailableRides()` - Fetch available rides
- `useMyRides()` - Get user's rides
- `useCreateRide()` - Create new ride
- `useUpdateRide()` - Update ride
- `useDeleteRide()` - Delete ride
- `useSearchRides()` - Search rides

### useJoinRequests.ts
- `useIncomingJoinRequests()` - Incoming requests
- `useMyJoinRequests()` - User's requests
- `useCreateJoinRequest()` - Request to join
- `useAcceptJoinRequest()` - Accept request
- `useRejectJoinRequest()` - Reject request
- `useCancelJoinRequest()` - Cancel request

## Best Practices

✅ Type-safe components with TypeScript
✅ Component composition and reusability
✅ Separation of concerns
✅ Clean code structure
✅ Responsive design
✅ Accessibility considerations
✅ Loading and error states

## Upcoming Features

- 📍 Ride card components
- 🗺️ Map integration
- 📊 Dashboard statistics
- 👤 User profile page
- ⭐ Rating system
- 🔔 Notifications
- 💬 Messaging

## Troubleshooting

**Build errors:**
```bash
rm -rf node_modules package-lock.json && npm install
```

**API connection issues:**
- Check VITE_API_URL in .env
- Verify backend server is running

## License

MIT License

---

**Built with ❤️ using React, Vite, and Ant Design**
