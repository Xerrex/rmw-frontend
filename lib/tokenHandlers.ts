export const setAccessToken = (accessToken: string)=>{
  if (typeof window === 'undefined') return;
  localStorage.setItem('access_token', accessToken);
}

export const clearAccessToken = ()=>{
  if(typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
}

export const setRefreshToken = (refreshToken: string) =>{
  if(typeof window === 'undefined') return;
  localStorage.setItem('refresh_token', refreshToken);
}

export const clearRefreshToken = ()=>{
  if(typeof window === 'undefined') return;
  localStorage.removeItem('refresh_token');
}

export const clearTokens = ()=>{
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
