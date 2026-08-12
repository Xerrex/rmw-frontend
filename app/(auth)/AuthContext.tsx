"use client";

import { createContext, useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignUpPayload, SignUpResponse, SignInPayload, SignInResponse, RefreshTokenResponse,
  ResetPasswordPayload, ResetPasswordResponse, SetPasswordPayload, SetPasswordResponse} from "./types";
import { apiCaller, noAuthApiCaller } from "@/lib/apiCaller";
import { consumePendingReturnTo, setAccessToken, setRefreshToken, hasAccessToken, clearTokens } from "@/lib/tokenHandlers";
import { UserData } from "./hooks/useAuthbackend";


export interface AuthContextType{
  loading: boolean;
  redirecting: boolean;
  signUpHandler: (payload: SignUpPayload, onSignUp:() => void) => Promise<void> | void;
  signInHandler: (payload: SignInPayload) => Promise<void> | void;
  refreshAccessTokenHandler: () => Promise<RefreshTokenResponse | null>;
  logoutHandler: () => Promise<void> | void;
  resetPasswordHandler: (payload:ResetPasswordPayload) => Promise<void> | void;
  setPasswordHandler: (payload:SetPasswordPayload, onPassSet: ()=>void) => Promise<void> | void;
  isAuthenticated: boolean;
  user: {
    first_name: string
    last_name: string
    email: string
  } | null;

}

const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: React.ReactNode }){
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasAccessToken() ?? false);

  const { details: user } = UserData(isAuthenticated);

  const signUpHandler = useCallback(async(payload: SignUpPayload, onSignUp:() => void )=>{
    setLoading(true);
    const {firstName, lastName, email, password} = payload;
    try {
      const response = await noAuthApiCaller.post<SignUpResponse>('/auth/signup',{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      });
      setLoading(false);

      if(response.data.details.success){
        toast.success(`Signed up successful ${response.data.details.first_name}`,
          {
            description: "Use your new credentials to login",
            position: "bottom-right"
          }
        )
        onSignUp();
        setRedirecting(true);
      }
      else{
        toast.error(`Sign up issue ${firstName}`,
          {
            description: "There was an error with your sign-up details",
            position: "bottom-right"
          }
        )
      }

    } catch (error) {
      void error;
      toast.error(`Sign up error ${firstName}`,
        {
          description: "There was an error with your sign-up details",
          position: "bottom-right"
        }
      )
    } finally{
      setLoading(false);
      setRedirecting(false);
    }

  }, []);

  const signInHandler = useCallback(async(payload: SignInPayload)=>{
    setLoading(true);

    try {
      const {email, password, remember} = payload;
      const response = await noAuthApiCaller.post<SignInResponse>('/auth/signin',{
        email: email,
        password: password,
        remember: remember
      });
      setLoading(false);

      if(response.data.details.success){
        
        toast.success(`Sign in successful`,
        {
          description: `Welcome back ${response.data.details.first_name}`,
          position: "bottom-right"
        }
      )
        setAccessToken(response.data.details.token.access_token);
        setRefreshToken();
        setIsAuthenticated(true);
        const returnTo = consumePendingReturnTo() ?? "/dashboard"
        router.replace(returnTo)
        setRedirecting(true)
      }else{
        toast.error(`Sign in issue`,
        {
          description: "There was an error with your sign-in details try again",
          position: "bottom-right"
        }
      )
      }
    } catch(error) {
      void error
      toast.error(`Sign in error`,
        {
          description: "There was an error with your sign-in details try again",
          position: "bottom-right"
        }
      )
    }finally{
      setLoading(false);
      setRedirecting(false);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshAccessTokenHandler = useCallback(async()=>{
    setLoading(true);
    try {
      const response = await noAuthApiCaller.post<RefreshTokenResponse>('/auth/refresh');
      setLoading(false);
      return response.data as RefreshTokenResponse
    } catch (error) {
      void error;
      return null;
    }finally{
      setLoading(false);
      setRedirecting(false);
    }
  }, []);

  const logoutHandler = useCallback(async()=>{
    setLoading(true);
    try {
      await apiCaller.post('/auth/logout');
      clearTokens();
      setIsAuthenticated(false);
      setLoading(false);
      router.push("/");
      setRedirecting(true);
    } catch (error) {
      void error
      toast.error(`Sign out error`,
        {
          description: "There was an error with your sign out process",
          position: "bottom-right"
        }
      )
      clearTokens();
      setIsAuthenticated(false);
      router.push("/");
    }finally{
      setLoading(false);
      setRedirecting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetPasswordHandler = useCallback(async(payload: ResetPasswordPayload)=>{
    setLoading(true);

    try {
      const response = await noAuthApiCaller.post<ResetPasswordResponse>('/auth/reset-password',{
        email: payload.email
      });
      setLoading(false);

      if(response.data.details.success){
        toast.success("Password reset request",{
          description: `Check your email for further instructions`,
          position: "bottom-right"
        })
        router.push("/");
      }else{
        toast.error("Password reset request issue",{
          description: `There was a problem, check email used and try again`,
          position: "bottom-right"
        })
      }
    } catch(error) {
      void error;
      toast.error(`Password reset request`,
        {
          description: "There was an error with your password reset request, try again",
          position: "bottom-right"
        }
      )
    }finally{
      setLoading(false);
      setRedirecting(false);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPasswordHandler = useCallback(async(payload: SetPasswordPayload, onPassSet: ()=>void)=>{
    setLoading(true);

    try {
      const {resetToken, password} = payload;
      const response = await noAuthApiCaller.put<SetPasswordResponse>(`/auth/set-password/${resetToken}`,{
        password
      });
      setLoading(false);

      if(response.data.details.success){
        toast.success(`Password setting successful`,
          {
            description: "Use your new credentials to login",
            position: "bottom-right"
          }
        )
        onPassSet();
        setRedirecting(true);
      }else{
        toast.error(`Password setting issue`,
          {
            description: "There was a problem saving your new password, check details & try again",
            position: "bottom-right"
          }
        )
      }
    } catch(error) {
      void error;
      toast.error(`Password setting error`,
        {
          description: "There was a system error saving your new password, check details & try again",
          position: "bottom-right"
        }
      )
    }finally{
      setLoading(false);
      setRedirecting(false);
    }
  
  }, []);

  const ctxValues = useMemo(()=>({
    loading, redirecting, signUpHandler, signInHandler,
    refreshAccessTokenHandler, logoutHandler, resetPasswordHandler, 
    setPasswordHandler, isAuthenticated, user: user ?? null
  }),[
    loading, redirecting, signUpHandler, signInHandler, 
    refreshAccessTokenHandler, logoutHandler, resetPasswordHandler, 
    setPasswordHandler, isAuthenticated, user
  ])

  return (
    <AuthContext.Provider value={ctxValues}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(){
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("Usage of auth context must be within the Auth Context")
  }

  return context;
}


export default AuthContext;
