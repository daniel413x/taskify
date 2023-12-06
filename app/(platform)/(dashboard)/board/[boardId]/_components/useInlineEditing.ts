import useOnKeyDown from '@/lib/hooks/useOnKeyDown';
import {
  useRef, useState, ElementRef,
} from 'react';

const useInlineEditing = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onEscape = () => {
    if (!isEditing) {
      return;
    }
    disableEditing();
  };
  useOnKeyDown('Escape', onEscape);
  return {
    formRef,
    inputRef,
    textareaRef,
    isEditing,
    enableEditing,
    disableEditing,
    onBlur,
  };
};

export default useInlineEditing;
