'use client';

import Cookies from 'js-cookie';
import { APP_ENV } from '@/config';


const COOKIE_OPTIONS = {
  path: '/',
  secure: APP_ENV === 'PROD',
  sameSite: 'Lax' as const, // TODO: review
};


export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') return;
  
  Cookies.set(name, value, {
    ...COOKIE_OPTIONS,
    expires: days,
  });
}


export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const value = Cookies.get(name);
  return value || null;
}


export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  Cookies.remove(name, { path: '/' });
}


export function getAllCookies(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  return Cookies.get();
}