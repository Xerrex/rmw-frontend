export interface AuthContextType{
  loading: boolean;
  redirecting: boolean;
  userDetails: {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
  } | undefined;
  isLoadingUser: boolean;
  refetchUser: () => Promise<unknown>;
  isRefetchingUser: boolean;
  isErrorUser: boolean;
}