# RideShare Frontend Development Guide

## Architecture Overview

The app follows a component-based architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                    App Component                     │
│         (Routing + Theme Provider)                  │
└─────────────────────────────────────────────────────┘
                         ↓
        ┌────────────────────────────────┐
        │     ThemeProvider Context      │
        │  (Light/Dark Mode Management)  │
        └────────────────────────────────┘
                         ↓
    ┌──────────────────────────────────────────┐
    │         ConfigProvider (Ant Design)       │
    │     QueryClientProvider (React Query)    │
    │       BrowserRouter (React Router)       │
    └──────────────────────────────────────────┘
                         ↓
    ┌────────────────────────────────────────────┐
    │              Pages/Routes                  │
    │  (LandingPage, Dashboard, AvailableRides) │
    └────────────────────────────────────────────┘
                         ↓
    ┌────────────────────────────────────────────┐
    │         Layout Components                  │
    │  (MainLayout, Sidebar, Header)            │
    └────────────────────────────────────────────┘
                         ↓
    ┌────────────────────────────────────────────┐
    │        Feature Components                  │
    │  (RideCard, JoinRequestCard, Forms)       │
    └────────────────────────────────────────────┘
```

## File Organization

### Pages (Entry Points)
Each page represents a route and handles:
- Route-specific layout
- Page-level state management
- Fetching initial data

### Components (Reusable)
Organized in feature folders:
- `Auth/` - Login and signup forms
- `Layout/` - Navigation and structure
- `ThemeToggle/` - Theme switching UI
- Future: `RideCard/`, `JoinRequestCard/`, etc.

### Hooks (Data & Logic)
React Query hooks for:
- `useAuth.ts` - Authentication operations
- `useRides.ts` - Ride CRUD and search
- `useJoinRequests.ts` - Request management

### Services (API)
- `apiClient.ts` - Axios instance with interceptors

### Types (TypeScript)
- `common.ts` - Shared interfaces for ride, user, requests, etc.

### Config (Constants)
- `theme.ts` - Color scheme and design tokens

## Creating a New Component

Follow this structure for new components:

```typescript
// components/YourFeature/YourComponent.tsx
import React from 'react';
import { Button } from 'antd';
import { YourOutlined } from '@ant-design/icons';

interface YourComponentProps {
  // Define props
  title: string;
  onAction: () => void;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  title,
  onAction,
}) => {
  return (
    <div className="your-component">
      <Button icon={<YourOutlined />} onClick={onAction}>
        {title}
      </Button>
    </div>
  );
};

// components/YourFeature/index.ts
export { YourComponent } from './YourComponent';
```

## Creating a New Hook

Structure for new hooks:

```typescript
// hooks/useYourFeature.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import type { YourType } from '../types/common';

// Request/Response types go above the hook
interface YourRequestType {
  field1: string;
  field2: number;
}

/**
 * Hook description
 */
export const useYourFeature = () => {
  return useQuery({
    queryKey: ['yourFeature'],
    queryFn: async (): Promise<YourType[]> => {
      const response = await apiClient.get<YourType[]>('/endpoint');
      return response.data;
    },
  });
};
```

## Adding a New Page

1. Create the page component:
```typescript
// pages/NewPage.tsx
import React from 'react';
import { MainLayout } from '../components/Layout';

export const NewPage: React.FC = () => {
  return (
    <MainLayout>
      <div>Your content here</div>
    </MainLayout>
  );
};
```

2. Add route in App.tsx:
```typescript
import { NewPage } from './pages/NewPage';

// In Routes component:
<Route
  path="/your-route"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

3. Add navigation in Sidebar.tsx:
```typescript
{
  key: '/your-route',
  icon: <YourIcon />,
  label: 'Your Label',
  onClick: () => navigate('/your-route'),
}
```

## Styling Guidelines

### Using Tailwind CSS
- Use utility classes for layout and spacing
- Use dark mode prefix: `dark:bg-gray-800`
- Use responsive prefixes: `md:grid-cols-2 lg:grid-cols-3`

```tsx
<div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
</div>
```

### Using Ant Design Components
- Import from 'antd'
- Theme is automatically applied
- Use semantic component names

```tsx
import { Card, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

<Card title="My Card">
  <Button icon={<PlusOutlined />} type="primary">
    Add
  </Button>
</Card>
```

## Theme Management

### Using the Theme Hook
```typescript
import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme, useSystemTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current mode: {isDark ? 'Dark' : 'Light'}
    </button>
  );
}
```

### Customizing Colors
Edit `src/config/theme.ts`:
```typescript
export const colors = {
  light: {
    primary: '#1976D2',    // Change primary color
    secondary: '#00BCD4',  // Change secondary color
    accent: '#FF9800',     // Change accent color
    // ... more colors
  },
  dark: {
    // Dark mode colors
  },
};
```

## API Integration

### Using API Hooks
```typescript
import { useAvailableRides, useCreateRide } from '../hooks/useRides';

function RidesList() {
  // Query data
  const { data: rides, isLoading, error } = useAvailableRides();
  
  // Mutation
  const createRide = useCreateRide();
  
  const handleCreate = async (rideData) => {
    try {
      await createRide.mutateAsync(rideData);
      // Success
    } catch (error) {
      // Error
    }
  };

  if (isLoading) return <Spin />;
  if (error) return <Empty description="Error loading rides" />;
  
  return (
    <div>
      {rides?.map(ride => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </div>
  );
}
```

### Adding Authentication
All requests automatically include the Bearer token via the Axios interceptor. No additional action needed.

## Performance Optimization

### Code Splitting
For large pages, use dynamic imports:
```typescript
const HeavyComponent = React.lazy(() => 
  import('./components/HeavyComponent')
);

// Use with Suspense
<Suspense fallback={<Spin />}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```typescript
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

### Query Optimization
Configure React Query caching in `lib/queryClient.ts`:
```typescript
staleTime: 1000 * 60 * 5,  // 5 minutes
gcTime: 1000 * 60 * 10,     // 10 minutes
```

## Error Handling

### API Errors
```typescript
try {
  await loginMutation.mutateAsync(credentials);
} catch (error: any) {
  const errorMessage = error.response?.data?.message || 'An error occurred';
  message.error(errorMessage);
}
```

### Component Errors
Use error boundaries or Ant Design's message/notification:
```typescript
import { message } from 'antd';

message.error('Something went wrong!');
message.success('Operation successful!');
message.warning('Please be careful');
```

## Testing Considerations

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { YourComponent } from './YourComponent';

test('renders correctly', () => {
  render(<YourComponent />);
  expect(screen.getByText('Expected text')).toBeInTheDocument();
});
```

### Hook Testing
```typescript
import { renderHook } from '@testing-library/react';
import { useYourHook } from './useYourHook';

test('hook works correctly', () => {
  const { result } = renderHook(() => useYourHook());
  expect(result.current).toBeDefined();
});
```

## Debugging

### React DevTools
- Use React DevTools extension to inspect components
- Check props and state in real-time

### Redux DevTools / React Query DevTools
- React Query DevTools already configured
- Shows all queries and mutations

### Network Tab
- Check API requests in browser DevTools Network tab
- Verify response data and status codes

### Console Logging
```typescript
console.log('Debug:', data);
console.error('Error:', error);
console.warn('Warning:', message);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build Optimization
```bash
npm run build
```

Outputs optimized files in `dist/` folder

### Environment Variables
Create `.env.production` for production API URL:
```
VITE_API_URL=https://api.production.com
```

### Hosting
- Compatible with any static hosting (Vercel, Netlify, AWS S3, etc.)
- Requires client-side routing setup for SPA

## Common Issues & Solutions

**Issue: Theme not applying**
- Solution: Clear localStorage, hard refresh browser

**Issue: API calls failing**
- Solution: Check VITE_API_URL in .env, verify backend is running

**Issue: Large bundle size**
- Solution: Use dynamic imports, enable code splitting

**Issue: Slow page load**
- Solution: Check React Query caching, use memoization

## Resources

- [React Documentation](https://react.dev)
- [Ant Design Docs](https://ant.design)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [React Query Docs](https://tanstack.com/query)
- [Vite Docs](https://vitejs.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

## Getting Help

1. Check the documentation of the relevant library
2. Search for similar issues in GitHub
3. Review error messages carefully
4. Check browser console for errors
5. Use React DevTools for debugging

---

**Happy coding! 🚀**
