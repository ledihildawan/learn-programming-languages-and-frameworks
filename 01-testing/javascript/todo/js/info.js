const Info = (() => {
  const container = document.querySelector('.tasks-wrap .container');

  function hide() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  function show(message) {
    hide();

    const alert = `<div class="${message.class}">${message.text}</div>`;

    container.insertAdjacentHTML('afterbegin', alert);

    setTimeout(() => hide(), 2000);
  }

  return {
    hide,
    show,
  };
})();
