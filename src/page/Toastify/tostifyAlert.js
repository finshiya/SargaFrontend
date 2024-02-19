import { faL } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showSuccessAlert = (message) => {

    toast.success(message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable:true,
        progress: undefined,
        theme:"light",
    });

};

export const showFailsAlert = (message) => {

    toast.error(message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable:true,
        progress: undefined,
        theme:"light",
    });

};