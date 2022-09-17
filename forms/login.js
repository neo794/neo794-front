import { html, css } from "polylib";
import { PlForm } from "@pf/front/components/pl-form.js";

export default class Login extends PlForm {
    static properties = {
        login: { type: String },
        password: { type: String },
        auth: { type: Boolean, value: false }
    }

    static css = css`
            :host {
                width: 100%;
                height: 100%;
                display: flex;
                background: url('/static/background.jpg');
                background-position: center center;
            }
            :host([hidden]) {
                display: none;
            }
            pl-flex-layout {
                gap: 24px;
            }
            .logo {
                width: auto;
            }
            .logo img {
                width: 450px;
            }
            .cmp {
                width: 320px;
            }
            .link {
                color: var(--pf-color-1);
            }
            .btn {
                width: 80px;
            }
            .footer {
                padding-bottom: 15px;
                color: var(--pf-color-4);
            }
        `;

    static template =  html`
            <pl-flex-layout fit align="center" justify="center" vertical fit>
                <pl-flex-layout justify="center" fit align="center" vertical>
                    <pl-flex-layout justify="center">
                        <div class="logo"><img src="/static/logo.png"></div>
                    </pl-flex-layout>
                    <pl-flex-layout class="cmp" justify="center" vertical>
                        <pl-flex-layout stretch>
                            <pl-input placeholder="Логин" value="{{login}}" stretch></pl-input>
                        </pl-flex-layout>
                        <pl-flex-layout stretch>
                            <pl-input placeholder="Пароль" value="{{password}}" type="password" stretch></pl-input>
                        </pl-flex-layout>
                        <pl-flex-layout stretch justify="space-between">
                            <pl-button variant="link" label="Забыл пароль" class="link"></pl-button>
                            <pl-button variant="link" label="Регистрация" class="link"></pl-button>
                            <pl-button variant="secondary" label="Войти" on-click="[[onLoginClick]]" class="btn"></pl-button>
                        </pl-flex-layout>
                    </pl-flex-layout>
                </pl-flex-layout>
                <pl-flex-layout stretch justify="center" class="footer">
                    Copyright © 2022 alexart.su
                </pl-flex-layout>
            </pl-flex-layout>
            <pl-action id="aLogin" data="{{auth}}" endpoint="/front/action/login" unauthorized></pl-action>
		`;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
                this.onLoginClick();
            }
        });
    }

    onLoginClick() {
        if (this.login && this.password) {
            this.$.aLogin.execute({ login: this.login, password: this.password });
            this.login = null;
            this.password = null;
        }
    }
}