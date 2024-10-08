import TooltipPopover from "./classes/tooltip-popovers";

const body = document.querySelector("body");
for (let i = 1; i <= 3; i++) {
  const text = `<input type="text" data-toggle="popover" data-title="Название подсказки поля для ввода № ${i}" data-content="Содержание подсказки поля для ввода № ${i}">
  <button type="button" data-toggle="popover" data-title="Название подсказки кнопки № ${i}" data-content="Содержание подсказки кнопки № ${i}"> Кнопка № ${i} </button>`;
  const div = document.createElement("div");
  div.innerHTML = text;
  div.classList.add("container");
  body.append(div);
}
const popover = new TooltipPopover();
popover.start();
