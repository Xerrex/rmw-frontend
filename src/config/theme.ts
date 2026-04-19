/**
 * Color Scheme for RideShare Application
 * Primary: Modern Blue - Professional and trustworthy
 * Secondary: Vibrant Teal - Supporting and complementary
 * Accent: Warm Orange - Call-to-action and highlights
 */

export const colors = {
  light: {
    primary: '#1976D2',      // Professional Blue
    primaryLight: '#42A5F5', // Light Blue
    primaryDark: '#1565C0',  // Dark Blue
    
    secondary: '#00BCD4',    // Vibrant Teal
    secondaryLight: '#4DD0E1', // Light Teal
    secondaryDark: '#00ACC1', // Dark Teal
    
    accent: '#FF9800',       // Warm Orange
    accentLight: '#FFB74D',  // Light Orange
    accentDark: '#F57C00',   // Dark Orange
    
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
    
    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
  },
  dark: {
    primary: '#42A5F5',      // Lighter Blue for dark mode
    primaryLight: '#64B5F6', // Even lighter
    primaryDark: '#1976D2',  // Darker
    
    secondary: '#4DD0E1',    // Lighter Teal
    secondaryLight: '#80DEEA', // Even lighter
    secondaryDark: '#00BCD4', // Darker
    
    accent: '#FFB74D',       // Lighter Orange
    accentLight: '#FFD54F',  // Even lighter
    accentDark: '#FF9800',   // Darker
    
    success: '#81C784',
    warning: '#FFD54F',
    error: '#EF5350',
    info: '#64B5F6',
    
    // Neutral colors (inverted for dark mode)
    white: '#121212',        // Dark background
    black: '#FFFFFF',        // Light text
    gray100: '#1E1E1E',
    gray200: '#2C2C2C',
    gray300: '#3F3F3F',
    gray400: '#525252',
    gray500: '#616161',
    gray600: '#757575',
    gray700: '#9E9E9E',
    gray800: '#BDBDBD',
    gray900: '#E0E0E0',
  },
};

export const getThemeToken = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  
  return {
    colorPrimary: palette.primary,
    colorLink: palette.secondary,
    colorSuccess: palette.success,
    colorWarning: palette.warning,
    colorError: palette.error,
    colorInfo: palette.info,
    colorBgBase: palette.white,
    colorBgContainer: isDark ? palette.gray100 : palette.white,
    colorTextBase: isDark ? palette.black : palette.gray900,
    colorTextSecondary: isDark ? palette.gray700 : palette.gray600,
    borderRadius: 8,
  };
};

export const getCustomColors = (isDark: boolean) => {
  return isDark ? colors.dark : colors.light;
};
