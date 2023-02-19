import { PlElement, html, css } from "polylib";

class PfLoader extends PlElement {
    static properties = {
        executing: { type: Boolean, value: false }
    }
    static css = css `
        #pfPreloader {
          position: fixed;
          top: 35px;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #fff;
          z-index: 10000000;
          opacity: 0.5;
      }
      #pfLoader {
          display: block;
          position: relative;
          left: 50%;
          top: 50%;
          width: 150px;
          height: 150px;
          margin: -75px 0 0 -75px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: var(--primary-base);
          -webkit-animation: spin 2s linear infinite;
          animation: spin 2s linear infinite;
      }
      #pfLoader:before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #BA55D3;
          -webkit-animation: spin 3s linear infinite;
          animation: spin 3s linear infinite;
      }
      #pfLoader:after {
          content: "";
          position: absolute;
          top: 15px;
          left: 15px;
          right: 15px;
          bottom: 15px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: var(--primary-dark);
          -webkit-animation: spin 1.5s linear infinite;
          animation: spin 1.5s linear infinite;
      }
      @-webkit-keyframes spin {
          0%   {
              -webkit-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              transform: rotate(0deg);
          }
          100% {
              -webkit-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
              transform: rotate(360deg);
          }
      }
      @keyframes spin {
          0%   {
              -webkit-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              transform: rotate(0deg);
          }
          100% {
              -webkit-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
              transform: rotate(360deg);
          }
      }
    `;
    static template = html `
        <div id="pfPreloader" hidden$="[[!executing]]">
            <div id="pfLoader"></div>
        </div>`;
}

customElements.define('pf-loader', PfLoader);