import { PlElement, html, css } from "polylib";
import '@plcmp/pl-icon/pl-icon.js';

class PfMenuItem extends PlElement {
    static properties = {
        items: { type: Object, value: () => { return {} } },
        name: { type: String },
        selected: { type: Boolean, reflectToAttribute: true }
    };
    static css = css `
        :host {
            height: 100%;
            transition: 0.3s;
            box-sizing: border-box;
            color: var(--pf-color-3);
            border-right: 1px solid var(--pf-color-5);
        }
        .items-flex {
            --menu-text-color: #464B52;
            display: flex;
            align-items: center;
            height: 36px;
            cursor: pointer;
            transition: 0.3s;
            padding: 0 5px;
            width: auto;
            min-width: 100px;
        }
        .items-flex:hover {
            background-color: var(--pf-color-17);
        }
        .items-flex pl-icon {
            --menu-text-color: #464B52;
            padding: 0 10px;
        }
    `;

    static template = html `
        <div class="items-flex">
            <pl-icon class="icon" iconset="[[_iconset(item.iconset)]]" icon="[[item.icon]]"></pl-icon>
            <span class="submenu-caption">[[item.caption]]</span>
            <pl-icon iconset="pl-default" hidden="[[!item.hasChildren]]" icon="chevron-right"></pl-icon>
        </div>
    `;

    _iconset(iconset) {
        return iconset || 'pl-default';
    }
}

customElements.define("pf-menu-item", PfMenuItem);