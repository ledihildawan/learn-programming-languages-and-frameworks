const Notification = () => {
  const contianer = document.querySelector('.tasks-wrap .container');

  const hide = () => {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  };

  const show = (message) => {
    hide();

    const alert = `<div class="${message.class}">${message.text}</div>`;

    contianer.insertAdjacentElement('afterbegin', alert);

    setTimeout(() => hide(), 2000);
  };

  return {
    hide,
    show,
  };
};
