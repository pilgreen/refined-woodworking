/*
 * Fading gallery element
 */

class FadingGallery extends HTMLElement {

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        display: block;
        position: relative;
        padding-top: 45vw;
      }

      @media(orientation: portrait) {
        :host {
          padding-top: 100vw;
        }
      }

      ::slotted(img) {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
        opacity: 0;
        transition: opacity .5s ease;
      }

      ::slotted(.active) {
        opacity: 1;
      }
    </style>

    <slot></slot>
    `;
    return t;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this.timer = window.setInterval(this.swap.bind(this), 4000);
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  swap() {
    let active = this.querySelector(".active");
    let next = active.nextElementSibling;

    // Disable the current one
    active.classList.remove("active");

    // Highlight the next one
    if(next) {
      next.classList.add("active");
    } else {
      this.firstElementChild.classList.add("active");
    }
  }
}

customElements.define("fading-gallery", FadingGallery);
