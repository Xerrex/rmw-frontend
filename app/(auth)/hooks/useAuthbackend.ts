"use client"

// import { useCallback } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiCaller, noAuthApiCaller } from "@/lib/apiCaller";
import { hasAccessToken } from "@/lib/tokenHandlers";


export interface UserDetailsResponse{
  id: number
  uuid: string
  first_name: string
  last_name: string
  email: string
}


export interface SignUpPayload { 
	firstName:  string
  lastName:  string
	email: string
	password: string
}

export interface SignUpResponse{
  details: {
    message: string
    action: string
    success: boolean
    first_name: string
    last_name: string
    email: string
  }
}

export interface SignInPayload {
	email: string
	password: string
	remember: boolean
}


export interface SignInResponse {
  details: {
    message: string
    action: string
    success: boolean
    // user_id: number
    // uuid: string
    first_name: string
    // last_name: string
    // email: string
    token:{
      access_token: string
      refresh_token: string
      token_type: string
    },
  },
}

export interface ResetPasswordPayload {
  email: string
}

export interface ResetPasswordResponse {
	details: {
    message: string
    action: string
    success: boolean
    reset_token?: string
  }
}

export interface SetPasswordPayload {
	resetToken: string
	password: string
}

export interface SetPasswordResponse{
  details: {
    message: string
    action: string
    success: boolean
  }
}

export interface RefreshTokenPayload{
  refresh_token: string
}

export interface RefreshTokenResponse{
  details: {
    message: string
    action: string
    success: boolean
    token?:{
      access_token: string
      refresh_token: string
      token_type: string
    },
  }
}

async function logAuthCall<TPayload>(operation: string, payload: TPayload) {
	// Simulates a backend request boundary.
	console.log(`[auth:${operation}]`, payload)
	// await Promise.resolve()
}

export function useAuthBackend() {
  const queryClient = useQueryClient();


  const signUp = useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: async ({firstName, lastName, email, password})=>{
      await logAuthCall("sign-up", {firstName, lastName, email, password}) // TODO: remove
      const response = await noAuthApiCaller.post<SignUpResponse>('/auth/signup',{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      });

      return response.data as SignUpResponse;
    },
    // onSuccess: ()=>{} // TODO add a query key invalidated
  })

  const signIn = useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: async ({email, password, remember})=>{
      await logAuthCall("sign-in", {email, password, remember}) // TODO: remove
      const response = await noAuthApiCaller.post<SignInResponse>('/auth/signin',{
        email: email,
        password: password,
        remember: remember
      });

      return response.data as SignInResponse;
    },
    // onSuccess: ()=>{} // TODO add a query key invalidated
  })

  const refreshAccessToken = useMutation<RefreshTokenResponse, Error, RefreshTokenPayload>({
    mutationFn: async()=>{
      const response = await noAuthApiCaller.post<RefreshTokenResponse>('/auth/refresh');

      return response.data as RefreshTokenResponse
    }
  })

  const logout = useMutation({
    mutationFn: async()=>{
      await apiCaller.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
    },
  })


  const requestPasswordReset = useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: async ({email})=>{
      await logAuthCall("request-password-reset", {email}) // TODO: remove
      const response = await noAuthApiCaller.post<ResetPasswordResponse>('/auth/reset-password',{
        email: email
      });

      return response.data as ResetPasswordResponse;
    },
    // onSuccess: ()=>{} // TODO add a query key invalidated
  })


  const setPassword = useMutation<SetPasswordResponse, Error, SetPasswordPayload>({
    mutationFn: async ({resetToken, password})=>{
      await logAuthCall("set-password", {resetToken, password}) // TODO: remove
      const response = await noAuthApiCaller.put<SetPasswordResponse>(`/auth/set-password/${resetToken}`,{
        password
      });

      return response.data as SetPasswordResponse;
    },
    // onSuccess: ()=>{} // TODO add a query key invalidated
  })


  const {data: userDetails, isLoading: isLoadingUser, refetch: refetchUser, 
    isRefetching: isRefetchingUser, isError: isErrorUser} = useQuery<UserDetailsResponse>({
    queryKey: ['user', 'profile'],
    queryFn: async ()=>{ // TODO: Change to authAPICaller
      const response =  await apiCaller.get<UserDetailsResponse>("/auth/me");
      return response.data as UserDetailsResponse
    },
    placeholderData: ()=> queryClient.getQueryData<UserDetailsResponse>(['user', 'profile']),
    staleTime:  1000 * 60 * 5, // 5 minutes
    enabled: hasAccessToken(),
  })


	return {
    signUpAPI: signUp,
		signInAPI: signIn,
		refreshAccessTokenAPI: refreshAccessToken,
    logoutAPI: logout,
		requestPassResetAPI: requestPasswordReset,
		setPasswordAPI: setPassword,
    userDetails,
    isLoadingUser,
    refetchUser,
    isRefetchingUser,
    isErrorUser
	}
}
