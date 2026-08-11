"use client";

import { createContext, useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType } from "./types";
import { useAuthBackend, SignUpPayload, SignInPayload,
  ResetPasswordPayload, SetPasswordPayload } from "./hooks/useAuthbackend";
import { setCookie } from "@/lib/cookies";


const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: React.ReactNode }){
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const { signUpAPI, signInAPI, logoutAPI,
    requestPassResetAPI, setPasswordAPI, userDetails,
    isLoadingUser, refetchUser, isRefetchingUser, isErrorUser } = useAuthBackend();

  const signUpHandler = useCallback(async(payload: SignUpPayload)=>{
    setLoading(true);
    try {
      const response = await signUpAPI.mutateAsync(payload);
      setLoading(false);

      if(response.details.success){
        // TODO: make signup success toast
        router.push("/sign-in");
        setRedirecting(true);
      }
      // else{
        // TODO: make signup failed toast
      // }
    } catch {
      // TODO: make signup toast error
    } finally{
      setLoading(false);
      setRedirecting(false);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInHandler = useCallback(async(payload: SignInPayload)=>{
    setLoading(true);

    try {
      const response = await signInAPI.mutateAsync(payload);
      setLoading(false);

      if(response.details.success){
        // TODO: make sign in success toast
        setCookie("access_token", response.details.token.access_token);
        setCookie("refresh_token", response.details.token.refresh_token);
        router.push("/home");
        setRedirecting(true)
      }

      // else{
        // TODO: make sign in failure toast
      // }
    } catch {
      // TODO: make sign in toast error
    }finally{
      setLoading(false);
      setRedirecting(false);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = useCallback(async()=>{
    await logoutAPI.mutateAsync()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetPasswordHandler = useCallback(async(payload: ResetPasswordPayload)=>{
    setLoading(true);

    try {
      const response = await requestPassResetAPI.mutateAsync(payload);
      setLoading(false);

      if(response.details.success){
        const reset_token = response.details.reset_token

        router.push(`/set-password/reset_token=${reset_token}`);
        setRedirecting(true);
      }
      // else{

      // }
    } catch {
      // TODO: make reset password toast error
    }finally{
      setLoading(false);
      setRedirecting(false);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPasswordHandler = useCallback(async(payload: SetPasswordPayload)=>{
    setLoading(true);

    try {
      const response = await setPasswordAPI.mutateAsync(payload);
      setLoading(false);

      if(response.details.success){
        router.push("/sign-in");
        setRedirecting(true);
      }
      // else{

      // }
    } catch {
      // TODO: make reset password toast error
    }finally{
      setLoading(false);
      setRedirecting(false);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctxValues = useMemo(()=>({
    loading, redirecting, signUpHandler, signInHandler,
    logoutHandler, resetPasswordHandler, setPasswordHandler,
    userDetails, isLoadingUser, refetchUser, isRefetchingUser, isErrorUser
  }),[ loading, redirecting, signUpHandler, signInHandler,
    logoutHandler, resetPasswordHandler, setPasswordHandler,
    userDetails, isLoadingUser, refetchUser, isRefetchingUser, isErrorUser
  ])

  return (
    <AuthContext.Provider value={ctxValues}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("Usage of auth context must be within the Auth Context")
  }

  return context;
}


export default AuthContext;
