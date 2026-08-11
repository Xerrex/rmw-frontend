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

export interface ResetPasswordPayload {
  email: string
}

export interface ResetPasswordResponse {
	details: {
    message: string
    action: string
    success: boolean
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
