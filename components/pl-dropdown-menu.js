import { PlElement, html, css } from "polylib";
import '@plcmp/pl-dropdown';

class PlDropdownMenu extends PlElement {
    static css = css`
        pl-dropdown[opened] {
            display: flex;
            flex-direction: column;
            background: var(--surface-color);
            border-radius: var(--border-radius);
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
            min-width: var(--content-width);
            box-sizing: border-box;
            overflow: auto;
            padding: var(--space-md) 0;
        }`

    static template = html`
        <pl-dropdown id="dd">
            <slot></slot>
        </pl-dropdown>
    `;

    open(target, fitInto, opts) {
        this.$.dd.open(target, fitInto, opts);
    }

    close(){
        this.$.dd.close();
    }
}
customElements.define('pl-dropdown-menu', PlDropdownMenu);
