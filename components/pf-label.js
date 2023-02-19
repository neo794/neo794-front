import { PlElement, html, css } from "polylib";

class PfLabel extends PlElement {
    static properties = {
        content: { type: String },
        textSize: { type: String, reflectToAttribute: true },
        bold: { type: Boolean, value: false, reflectToAttribute: true },
        header: { type: String, value: null, reflectToAttribute: true }
    };
    static css = css `
        :host {
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            color: var(--pf-color-5);
            min-height: 32px;
            height: auto;
        }
        :host([hidden]) {
            display: none !important;
        }
        :host([text-size="xs"]) {
            font-size: var(--pf-base-size-xs) !important;
        }
        :host([text-size="s"]) {
            font-size: var(--pf-base-size-s) !important;
        }
        :host([text-size="ms"]) {
            font-size: var(--pf-base-size-ms) !important;
        }
        :host([text-size="m"]) {
            font-size: var(--pf-base-size-m) !important;
        }
        :host([text-size="l"]) {
            font-size: var(--pf-base-size-l) !important;
        }
        :host([header="h1"]) {
            font: var(--font-h1);
            color: var(--black-base);
            text-align: start;
        }
        :host([header="h2"]) {
            font: var(--font-h2);
            color: var(--black-base);
            text-align: start;
        }
        :host([header="h3"]) {
            font: var(--font-h3);
            color: var(--black-base);
            text-align: start;
        }
        :host([header="h4"]) {
            font: var(--font-h4);
            color: var(--black-base);
            text-align: start;
        }
        :host([bold]){
            font-weight: bold;
        }
        p {
            margin: 0;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    `;
    static template = html `
        <p>[[content]]</p>
    `;
}

customElements.define('pf-label', PfLabel);