import { ActionState, FieldErrors } from '@/actions/utils/create-validated-action';
import { useCallback, useState } from 'react';

type Action<I, O> = (data: I) => Promise<ActionState<I, O>>;

interface UseActionOptions<O> {
  onSuccess?: (data: O) => void;
  onError?: (e: string) => void;
  onComplete?: () => void;
}

const useAction = <I, O>(
  action: Action<I, O>,
  options: UseActionOptions<O> = {},
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<I> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<O | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const execute = useCallback(
    async (input: I) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        setFieldErrors(result.fieldErrors);
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          setError(undefined);
          setFieldErrors(undefined);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );
  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};

export default useAction;
