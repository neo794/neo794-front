import { html, css } from "polylib";
import { PlForm } from "@pf/front/components/pl-form.js";

export default class Index extends PlForm {
    static get properties() {
        return {
            hideHeader: {
                value: true,
                type: Boolean
            }
        };
    }

    static get template() {
        return html`
           
        `;
    }
}