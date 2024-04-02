export const scrollToBottom = (container: any) => {
  if (container.current) {
    container.current.scrollTop = container.current.scrollHeight;
  }
};
