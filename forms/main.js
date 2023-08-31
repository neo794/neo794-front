import { html, css } from "polylib";
import { PlForm } from "@neo794/front/components/pl-form.js";

export default class MainView extends PlForm {
    static properties = {
        userProfile: { type: Object, value: () => ({}) },
        menuItems: { type: Array, value: () => ([]) },
        menuOpened: { type: Boolean, value: false },
        currentForm: { type: Object },
        currentThread: { type: Object },
        breadcrumbs: { type: Array },
        singleThread: { type: Boolean },
        menuManualHide: { type: Boolean },
        dashboard: { type: String }
    };

    static css = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        .content {
            background: var(--background-color);
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow-x: auto;
            overflow-y: auto;
        }
        pl-icon-button[variant="link"] {
            --primary-base: var(--grey-light);
            --primary-dark: var(--grey-lightest);
            --primary-darkest:#fff;
        }        
        #formManager {
            padding: 0 var(--space-lg) var(--space-lg) var(--space-lg);
        }
        .tools {
            gap: 0px;
        }
        .tools-icon {
            cursor: pointer;
            border-right: 1px solid var(--pf-color-5);
            padding: 5px;
            height: 100%;
            display: flex;
            align-items: center;
            width: 30px;
            justify-content: center;
            transition: 0.3s;
        }
        .tools-icon img {
            width: 20px;
            padding: 0;
        }
        .tools-icon:first-child {
            border-left: 1px solid var(--pf-color-5);
        }
        .tools-icon:last-of-type {
            margin-right: 10px;
        }
        .tools-icon:hover {
            background-color: var(--pf-color-17);
        }
    `;

    static template = html`
        <pf-menu id="menu" items="[[menuItems]]" opened={{menuOpened}} on-menu-item-selected="[[onMenuItemSelected]]">
            <pl-flex-layout slot="tools" fit justify="flex-end" align="center" class="tools">
                <pl-flex-layout class="tools-icon">
                    <img src="/static/tg.png">
                    </pl-flex-layout>
                <pl-flex-layout class="tools-icon">
                    <img src="/static/vk.png">
                </pl-flex-layout>
                <pl-flex-layout class="tools-icon">
                    <pl-icon-button iconset="pl-default" size="16" icon="mail" on-click="" variant="link"></pl-icon-button>
                </pl-flex-layout>
                <pl-flex-layout class="tools-icon">
                    <pl-icon-button iconset="pl-default" size="16" icon="pencil" on-click="" variant="link"></pl-icon-button>
                </pl-flex-layout>
                <pl-button variant="secondary" negative label="Выход" on-click="[[onLogoutClick]]">
                    <pl-icon iconset="pl-default" size="16" icon="logout-filled" slot="prefix"></pl-icon>
                </pl-button>
            </pl-flex-layout>
        </pf-menu>
        <div class="content">
            <pl-forms-manager id="formManager" current-form="{{currentForm}}" current-thread="{{currentThread}}" single-thread="[[singleThread]]" dashboard="[[dashboard]]">
            </pl-forms-manager>
            <pl-router id="router" disable-history current-form="{{currentForm}}" current-thread="[[currentThread]]"
                form-manager="[[$.formManager]]"></pl-router>
        </div>
        <pl-dataset id="dsMenu" data="{{menuItems}}" endpoint="/front/action/getMenu"></pl-dataset>
        <pl-action id="aLogout" endpoint="/front/action/logout"></pl-action>
        <pl-action id="aGetUserProfile" data="{{userProfile}}" endpoint="/front/action/getUserProfile"></pl-action>
        <pl-action id="aGetVersion" endpoint="api/getVersion"></pl-action>
    `;

    onConnect() {
        this.$.aGetVersion.execute().then((res)=>{
            document.title = `proFootball v${res.version}`;
        });
        this.singleThread = NF?.config?.front?.formManager?.singleThread === true;
        this.dashboard = NF?.config?.front?.formManager?.dashboard;
        this.menuManualHide = NF?.config?.front?.mainMenu?.manualHide === true;
        NF.MainContainer = this.$.formManager;
        this.$.dsMenu.execute();
        this.$.aGetUserProfile.execute().then(res => NF.user = {...res});
        addEventListener('form-change', e => this.onFormChange());
        if (this.menuManualHide) {
            //save state to localstorage
            let m = localStorage.getItem('mainMenuOpened');
            if (m)
                this.menuOpened = m === 'true';
            else
                this.menuOpened = NF?.config?.front?.mainMenu?.defaultOpened === true;
        }
    }

    onMenuItemSelected(event) {
        if (event.detail.form) {
            this.$.formManager.open(event.detail.form, { newThread: event.detail.newThread, extKey: event.detail.form });
        }
    }

    async onLogoutClick() {
        const action = await this.showConfirm('Вы действительно хотите выйти из приложения?');
        if (action) {
            await this.$.aLogout.execute();
            document.location.reload();
        }
    }
    isHeaderHidden(form) {
        return !form || form.hideHeader;
    }
    onFormChange() {
        this.breadcrumbs = this.currentThread.node.openedForms.map( i => ({ title: i.formTitle, form: i })).slice(0,-1);
    }
    async onBreadCrumbsClick(e) {
        while (this.currentForm != e.detail?.form && !this.currentForm._dashboard) {
            let r = await this.currentForm.close();
            if (r === false) break;
        }
    }
}