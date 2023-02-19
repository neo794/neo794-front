import { PlElement, html, css } from "polylib";
import './pf-label.js';

class PfLabeledText extends PlElement {
    static properties = {
        label: { type: String },
        text: { type: String },
        textSize: { type: String, reflectToAttribute: true },
        variant: { type: String, reflectToAttribute: true }
    }
    static css = css `
        :host { 
            display: flex; 
            position: relative; 
            flex-direction: column; 
        }
        :host([variant='horizontal']) { 
            flex-direction: row; 
        }
        :host([variant='vertical']) { 
            flex-direction: column; 
        }
        label {
            display: inline-block;
            user-select: none;
            font: var(--pf-label-font);
            color: var(--pf-label-color);
            min-height: var(--pf-label-line-height);
            padding-right: 8px;
            padding-top: 8px;
            box-sizing: border-box;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: inherit;
            font-weight: bold;
        }
        pf-label {
            font-size: var(--pf-label-font);
            color: var(--pf-black, inherit);
            padding: 0;
        }
    `;

    static template = html `
        <label id="label" for$="[[_inputId]]">[[label]]</label>
        <pf-label id="[[_inputId]]" content="[[text]]"></pf-label>
    `;
}

customElements.define('pf-labeled-text', PfLabeledText);