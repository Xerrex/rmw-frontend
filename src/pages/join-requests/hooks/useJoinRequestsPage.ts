import { message } from 'antd';
import {
  useAcceptJoinRequest,
  useIncomingJoinRequests,
  useMyJoinRequests,
  useRejectJoinRequest,
} from '../../../hooks/useJoinRequests';

interface JoinRequestActionInput {
  requestId: string;
  action: 'accept' | 'reject';
}

interface JoinRequestActionResponse {
  success: boolean;
}

export const useJoinRequestsPage = () => {
  const incomingQuery = useIncomingJoinRequests();
  const myRequestsQuery = useMyJoinRequests();
  const acceptMutation = useAcceptJoinRequest();
  const rejectMutation = useRejectJoinRequest();

  const handleAction = async (input: JoinRequestActionInput): Promise<JoinRequestActionResponse> => {
    try {
      if (input.action === 'accept') {
        await acceptMutation.mutateAsync(input.requestId);
      } else {
        await rejectMutation.mutateAsync(input.requestId);
      }
      message.success(`Request ${input.action}ed`);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Request update failed';
      message.error(errorMessage);
      return { success: false };
    }
  };

  return {
    incomingRequests: incomingQuery.data ?? [],
    myRequests: myRequestsQuery.data ?? [],
    isLoading: incomingQuery.isLoading || myRequestsQuery.isLoading,
    isMutating: acceptMutation.isPending || rejectMutation.isPending,
    handleAction,
  };
};
