import { Slide, toast } from "react-toastify";

export const handleToastMessage = (
  message: string | undefined,
  type: string,
) => {
  
  const options: {} = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Slide,
  };

  switch (type) {
    case "warning":
      toast.warning(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
  }
};
