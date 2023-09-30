import { LitElement, html, css } from "lit";

import "./splitter/smart.splitter.js";
import "./componentes/list_funciones/list-funciones.js";
import "./componentes/consola/consola.js";

import split_misc from "./splitter/css/smart.misc.css";
import split_split from "./splitter/css/smart.splitter.css";
import split_var from "./splitter/css/smart.variables.css";

//Elimina los márgenes del Body
document.body.style.all = "unset";

export class BodyTester extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            #splitter {
                box-sizing: border-box;
                display: block;
                height: 100vh;
                width: 100%;
            }

            #subsplitter {
                box-sizing: border-box;

                display: block;
            }

            #item-consola {
                background-color: rgb(36, 36, 36);
            }

            #item-funciones {
                background-color: rgb(36, 36, 36);
            }

            @font-face {
                font-family: "smart-icons";
                src: url("./font/smart-icons.woff2") format("woff2"), url("./font/smart-icons.woff") format("woff"), url("./font/smart-icons.ttf") format("truetype"), url("./font/smart-icons.eot") format("embedded-opentype");
                font-weight: normal;
                font-style: normal;
            }
        `
        ,
        split_var,
        split_misc,
        split_split,
    ];

    firstUpdated() {
        let consola = this.shadowRoot.getElementById("item-consola");
        let funciones = this.shadowRoot.getElementById("item-funciones");

        consola.content = document.createElement("consola-dev");
        funciones.content = document.createElement("list-funciones");

        window.onload = () => {
            let spli = this.shadowRoot.getElementById("splitter");
            let subspli = this.shadowRoot.getElementById("subsplitter");
            spli.refresh();
            subspli.refresh();

        };

        window.addEventListener("resize", () => {
            let spli = this.shadowRoot.getElementById("splitter");
            let subspli = this.shadowRoot.getElementById("subsplitter");
            spli.refresh();
            subspli.refresh();

        });
    }

    render() {
        return html`
            <smart-splitter id="splitter" orientation="vertical" live-resize>
                <smart-splitter-item size="70%" collapsible id="item00">
                    <smart-splitter orientation="horizontal" id="subsplitter" live-resize>
                        <smart-splitter-item size="70%" collapsible id="item-libre">
                            <slot></slot>
                        </smart-splitter-item>

                        <smart-splitter-item size="30%" collapsible id="item-consola">
                            <!-- <consola-dev></consola-dev> -->
                        </smart-splitter-item>
                    </smart-splitter>
                </smart-splitter-item>

                <smart-splitter-item size="30%" collapsible id="item-funciones">
                    <!-- <list-funciones></list-funciones> -->
                </smart-splitter-item>
            </smart-splitter>
        `;
    }
}

customElements.define("body-tester", BodyTester);
