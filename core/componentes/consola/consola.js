import { LitElement, html, css } from "lit";
import g_style from "./css/g_style.css";

export class Consola extends LitElement {
    static styles = [
        g_style,
        css`
            :host {
                font-family: monospace;
                font-size: 0.81rem;
                overflow: hidden;
                height: calc(100% - 2rem);
                display: flex;
                flex-direction: row;
                margin: 1em;
                color: aliceblue;
                border-radius: 0.7em;
                background-color: rgb(51, 51, 51);
                border: 0.1em solid rgba(136, 136, 136, 0.059);
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            }
        `,
    ];

    limpiar() {
        this.shadowRoot.querySelector(".cont-msj").innerHTML = "";
    }

    escribir(texto, est = 1) {
        const consl = this.shadowRoot.querySelector(".cont-msj");
        const nuevotexto = document.createElement("span");
        nuevotexto.classList.add("msj");
        nuevotexto.textContent = texto;

        est != 1 ? (nuevotexto.style.color = "red") : null;

        consl.appendChild(nuevotexto);
    }

    constructor() {
        super();
        //Crea la función global cw, que llama a escribir()
        window.cw = (texto, est = 1) => {
            let body_t = document.querySelector("body-tester").shadowRoot;
            let consola = body_t.querySelector("consola-dev");
            consola.escribir(texto, est);
        };
    }

    render() {
        return html`
            <div class="mensajes">
                <span class="msj">Consola DEV :</span>
                <div class="cont-msj"></div>
            </div>
            <div class="botonera">
                <button @click="${() => this.limpiar()}" class="butt">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 448 512" style="enable-background: new 0 0 448 512" xml:space="preserve">
                        <style type="text/css">
                            .st0 {
                                fill: #ededed;
                            }
                        </style>
                        <path class="st0" d="M84.9,467c1.3,24.8,18.8,45,39,45h200.3c20.3,0,37.7-20.2,39-45l17.3-339H67.6L84.9,467z M393.5,32h-91.2 l-9.4-23.2c-2.2-5.4-6.7-8.8-11.7-8.8H166.9c-4.9,0-9.5,3.4-11.7,8.8L145.8,32H54.5c-7.2,0-13,7.2-13,16v32c0,8.8,5.8,16,13,16 h338.9c7.2,0,13-7.2,13-16V48C406.5,39.2,400.6,32,393.5,32z" />
                    </svg>
                </button>
            </div>
        `;
    }
}
customElements.define("consola-dev", Consola);
