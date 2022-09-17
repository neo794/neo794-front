import { PlElement, html, css } from "polylib";
import '@plcmp/pl-icon/pl-icon.js';
import { addOverlay, removeOverlay } from "@plcmp/utils";
import './pf-menu-item.js';

class PfMenu extends PlElement {
    static properties = {
        items: { type: Array, value: ()=> { return [] } },
        selected: { type: Object, value: null, observer: '_selectedObserver' }
    };
    static css = css `
        :host {
            display: flex;
			flex-direction: row;
			box-sizing: border-box;
			width: 100%;
			user-select: none;
			height: 36px;
			background: var(--pf-color-16);
			transition: all 0.3s ease-in-out;
			will-change: width;
			position: relative;
			border-bottom: 1px solid var(--pf-color-4);
			font-size: 14px;
        }
        .submenu-item { 
            width: 100%;
            display: flex;
			flex-direction: row;
			position: relative;
			height: 100%;  
			min-width: var(--menu-opened-width);
			animation: fade 0.3s;
			justify-content: space-between;
		}
		.submenu-item .items {
		    display: flex;
			flex-direction: row;
			position: relative;
			height: 100%;  
			min-width: var(--menu-opened-width);
			animation: fade 0.3s;
		}
		.submenu-item .tools {
		    width: 300px;
		    max-width: 300px;
		    height: 100%;
		    padding-right: 5px;
		}
    `;

    static template = html `
        <div class="submenu-item">
            <div class="items">
                <pf-menu-item d:repeat="[[filterItems(items)]]" d:as="item" item="[[item]]" on-click="[[onMenuClick]]"></pf-menu-item>
            </div>
            <div class="tools">
                <slot name="tools"></slot>
            </div>
        </div>
    `;

    onMenuClick(event) {
        this.selected = event;
    }

    _selectedObserver(value) {
        let detail = {...value.model.item, newThread: value.shiftKey };
        this.dispatchEvent(new CustomEvent('menuItemSelected', { detail: detail, bubbles: true, composed: true }));
    }

    filterItems(items){
        return items.filter( e => e.form && e.guid);
    }
}

customElements.define("pf-menu", PfMenu);