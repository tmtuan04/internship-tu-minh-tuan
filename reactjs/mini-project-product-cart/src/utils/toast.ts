import { toast, ToastType } from "react-hot-toast"

export const showToast = (
    message: string,
    type: ToastType = 'success',
    duration: number = 3000,
  ) => {
    switch (type) {
      case 'success':
        toast.success(message, { duration });
        break;
      case 'error':
        toast.error(message, { duration });
        break;
      case 'loading':
        toast.loading(message, { duration });
        break;
      case 'custom':
        toast(message, { duration });
        break;
      default:
        toast(message, { duration });
    }
  };