import { message } from 'antd';
import { ApiError, RequestAbortedError } from '../../../services/projectIdeasApi';
import { ErrorCode } from '../../../types';

export function handleError(error: unknown, notification: any): void { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (error instanceof RequestAbortedError) {
    message.error('Превышено время ожидания. Попробуйте еще раз.');
    
    return;
  }
  
  if (error instanceof ApiError) {
    const errorCode = (error as ApiError & { code?: ErrorCode }).code;
    
    if (errorCode === ErrorCode.VOTE_LIMIT_REACHED) {
      notification.warning({
        message: 'Лимит голосов исчерпан',
        description: 'Вы истратили все свои голоса для голосования (максимум 10 голосов)',
        placement: 'top',
        duration: 4
      });
      return;
    }
    
    if (errorCode === ErrorCode.USER_ALREADY_VOTED) {
      notification.warning({
        message: 'Голосование невозможно',
        description: 'Вы уже проголосовали за эту идею',
        placement: 'top',
        duration: 4
      });
      return;
    }
  } else {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка при голосовании';
    message.error(errorMessage);
  }
}
