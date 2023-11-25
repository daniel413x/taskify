'use client';

import createBoard from '@/actions/boards/create';
import useAction from '@/lib/hooks/useAction';
import FormInput from './FormInput';
import FormButton from './FormButton';

const Form = () => {
  const {
    execute,
    fieldErrors,
  } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'success');
    },
    onError: (e) => {
      console.log(e, 'error');
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <FormInput errors={fieldErrors} />
      <FormButton />
    </form>
  );
};

export default Form;
