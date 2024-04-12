import { useRef } from "react";

const useScrollToButton = () => {
  const ref = useRef<any>(null);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  return { ref, scrollToBottom };
};

export default useScrollToButton;
