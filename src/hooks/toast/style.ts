import { ToastOptions, UpdateOptions } from "react-toastify";

import { errorColor, successColor, warningColor } from "@/styles/variables";

const defaultPatterns: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    delay: 100,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
};

export default class Style {

    public static success: ToastOptions = {
        ...defaultPatterns,
        theme: "colored",       
        style: {
            backgroundColor: successColor,
        }                
    };

    public static warning: ToastOptions = {
        ...defaultPatterns,
        theme: "colored",       
        style: {
            backgroundColor: warningColor,
        }                
    };

    public static error: ToastOptions = {
        ...defaultPatterns,
        theme: "colored",    
        style: {
            backgroundColor: errorColor,
        }                
    }

    public static successUpdate(
        message:string, 
        optionsParam: object = {}
    ): UpdateOptions<unknown> {
        return ({
            ...defaultPatterns,
            autoClose: 1000,
            render: message,
            type: "success",
            isLoading: false,
            theme: "colored",       
            style: {
                backgroundColor: successColor,
            },
            ...optionsParam       
        });         
    };

    public static warningUpdate(
        message:string, 
        optionsParam: object = {}
    ): UpdateOptions<unknown> {
        return ({
            ...defaultPatterns,
            autoClose: 1000,
            render: message,
            type: "warning",
            isLoading: false,
            theme: "colored",       
            style: {
                backgroundColor: warningColor,
            },
            ...optionsParam       
        });         
    };

    public static errorUpdate(
        message:string, 
        optionsParam: object = {}
    ): UpdateOptions<unknown> {
        return ({
            ...defaultPatterns,
            render: message,
            type: "error",
            position: "top-right",
            isLoading: false,
            theme: "colored",    
            style: {
                backgroundColor: errorColor,
            },
            ...optionsParam        
        });         
    };

}