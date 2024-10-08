export default class TooltipPopover {
  constructor(container = "body") {
    this.container = document.querySelector(container);
    this.tooltip;
    this._showTooltip = this._showTooltip.bind(this);
    this._removeTooltip = this._removeTooltip.bind(this);
  }

  start() {
    this.container.addEventListener("mouseover", this._showTooltip, true);
    this.container.addEventListener("mouseout", this._removeTooltip, true);
  }

  _showTooltip(e) {
    if (!(e.target.getAttribute("data-toggle") === "popover")) return;

    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip-popover");

    const title = document.createElement("div");
    title.textContent = e.target.dataset.title;
    title.classList.add("tooltip-title");
    this.tooltip.append(title);

    const content = document.createElement("div");
    content.textContent = e.target.dataset.content;
    this.tooltip.append(content);

    document.body.appendChild(this.tooltip);

    const { left, top } = e.target.getBoundingClientRect();

    this.tooltip.style.left =
      left + e.target.offsetWidth / 2 - this.tooltip.offsetWidth / 2 + "px";
    this.tooltip.style.top = top - this.tooltip.offsetHeight - 5 + "px";
  }

  _removeTooltip(e) {
    if (!(e.target.getAttribute("data-toggle") === "popover")) return;
    this.tooltip.remove();
  }
}
