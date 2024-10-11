require("jsdom-global")();
import TooltipPopover from "../classes/tooltip-popovers";

describe("Тестирование класса TooltipPopover", () => {
  const body = document.querySelector("body");

  beforeAll(() => {
    for (let i = 1; i <= 3; i++) {
      const text = `<input type="text" data-toggle="popover" data-title="Название подсказки поля для ввода № ${i}" data-content="Содержание подсказки поля для ввода № ${i}">
      <button type="button" data-toggle="popover" data-title="Название подсказки кнопки № ${i}" data-content="Содержание подсказки кнопки № ${i}"> Кнопка № ${i} </button>`;
      const div = document.createElement("div");
      div.innerHTML = text;
      div.classList.add("container");
      body.append(div);
    }

    const input3 = body.querySelectorAll("input")[2];
    input3.removeAttribute("data-toggle");
    const button3 = body.querySelectorAll("button")[2];
    button3.removeAttribute("data-toggle");

    const popover = new TooltipPopover();
    popover.start();
  });

  test.each([
    ["input", 0],
    ["button", 0],
  ])(
    "Проверка появления/удаления всплывающей подсказки на %p",
    (selector, index) => {
      const element = body.querySelectorAll(selector)[index];
      element.dispatchEvent(new Event("mouseover"));

      const tooltip = body.querySelector(".tooltip-popover");
      expect(tooltip.tagName).toBe("DIV");

      const title = tooltip.children[0];
      expect(title.textContent).toBe(element.dataset.title);

      const content = tooltip.children[1];
      expect(content.textContent).toBe(element.dataset.content);

      element.dispatchEvent(new Event("mouseout"));

      const bool = body.querySelector(".tooltip-popover");
      expect(bool).toBe(null);
    },
  );

  test.each([
    ["input", 2],
    ["button", 2],
  ])("Проверка не появления всплывающей подсказки на %p", (selector, index) => {
    const element = body.querySelectorAll(selector)[index];
    element.dispatchEvent(new Event("mouseover"));

    const bool = body.querySelector(".tooltip-popover");
    expect(bool).toBe(null);

    element.dispatchEvent(new Event("mouseout"));
  });
});
