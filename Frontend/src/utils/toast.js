import { toast } from 'sonner';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      style: {
        background: '#10B981',
        color: 'white',
        border: 'none'
      }
    });
  },
  
  warn: (message) => {
    toast.warning(message, {
      style: {
        background: '#F59E0B',
        color: 'white',
        border: 'none'
      }
    });
  },
  
  error: (message) => {
    toast.error(message, {
      style: {
        background: '#EF4444',
        color: 'white',
        border: 'none'
      }
    });
  }
};
