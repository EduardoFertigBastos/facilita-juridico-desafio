import {
  Id, ToastContent, ToastOptions, toast,
} from 'react-toastify';

import Style from './style';

export default class Toast {

  constructor(private id?: Id) {
    this.id = id;
  }

  public loading(
    content: ToastContent<unknown> = 'Processando...',
    options?: ToastOptions<{}> | undefined,
  ) {
    this.id = toast.loading(content, options);

    return this;
  }

  public warning(message: string = 'Cuidado!', options?: ToastOptions<{}> | undefined) {
    if (this.id) {
      return toast.update(this.id as Id, { ...Style.warningUpdate(message), ...options });
    }

    return toast.warning(message, { ...Style.warning, ...options });
  }

  public success(message: string = 'Dados enviados com sucesso!', options?: ToastOptions<{}> | undefined) {
    if (this.id) {
      return toast.update(this.id as Id, { ...Style.successUpdate(message), ...options });
    }


    return toast.success(message, { ...Style.success, ...options });
  }

  public error(message: string = 'Oops... Algum erro aconteceu!', options?: ToastOptions<{}> | undefined) {
    if (this.id) {
      return toast.update(this.id as Id, { ...Style.errorUpdate(message), ...options });
    }

    console.log(message, { ...Style.error, ...options })
    return toast.error(message, { ...Style.error, ...options });
  }

  public dismiss() {
    if (this.id) {
      return toast.dismiss(this.id as Id);
    }

    return toast.dismiss();
  }

}
