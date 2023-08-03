import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import rutas_test from "../../../rutas_test.js";

import style from "./css/style.css";

import flechasvg from "./svg/flecha.svg";

const indice = flechasvg.indexOf(",");
var svg_flecha = flechasvg.slice(indice + 1);
svg_flecha = decodeURIComponent(svg_flecha);

export class listfunciones extends LitElement {
    static styles = [
        style,
        css`
            :host {
                display: flex;
                flex-direction: column;
                background-color: #27282b;
                box-sizing: border-box;
            }
        `,
    ];

    static properties = {
        num_rutas_archivos: { type: Number },
        archivos: { type: Object },
        num_archivos: { type: Number },
    };

    constructor() {
        super();

        this.num_rutas_archivos = rutas_test.length;
        this.archivos = {};
        this.num_archivos = 0;

        function get_nombre(ruta) {
            let pathArray = ruta.split("/");
            let fileName = pathArray[pathArray.length - 1];
            return fileName;
        }

        function analizar(archivo, scriptContent) {
            let scriptElement = document.createElement("script");
            scriptElement.id = archivo;
            scriptElement.textContent = scriptContent;
            document.head.appendChild(scriptElement);

            let functionDeclarations = scriptContent.match(/function\s+([^\(]+)\(([^\)]*)\)/g);
            let functionsArray = {};

            functionDeclarations.forEach(function (declaration) {
                let functionName = declaration.match(/function\s+([^\(]+)/)[1];
                let argumentos = declaration
                    .match(/function\s+[^\(]+\(([^)]*)\)/)[1]
                    .split(",")
                    .map(function (arg) {
                        return arg.trim();
                    });
                let referencia = window[functionName];
                functionsArray[functionName] = { referencia, argumentos };
            });

            return functionsArray;
        }

        function get_js(obje, ruta) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", ruta, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let response = xhr.responseText;

                    // Manejar la respuesta del servidor
                    let archivo = get_nombre(ruta);
                    obje.archivos[archivo] = analizar(archivo, response);

                    //actualiza el compnente
                    obje.num_archivos = Object.keys(obje.archivos).length;
                }
            };

            xhr.send();
        }

        for (var index = 0; index < rutas_test.length; index++) {
            let ruta = rutas_test[index];
            get_js(this, ruta);
        }
    }

    limpiar(event) {
        const button = event.target;
        const inputs_div = button.parentElement.nextElementSibling;
        const inputs = inputs_div.querySelectorAll("input");

        inputs.forEach((input) => {
            input.value = "";
        });
    }

    ejecutar_f(event, funcion) {
        const button = event.target;
        const inputs_div = button.parentElement.nextElementSibling;
        const inputs = inputs_div.querySelectorAll("input");

        const rgx_comillas = /^(['"])(.*)\1$/;
        const rgx_llaves = /^\{.*\}$/;
        const rgx_chtes = /^\[.*\]$/;

        let argumentos = [];
        inputs.forEach((input) => {
            input = input.value;

            if (!rgx_comillas.test(input)) {
                if (input == "true") {
                    input = true;
                } else if (input == "false") {
                    input = false;
                } else if (input == "null") {
                    input = null;
                } else if (input == "undefined") {
                    input = undefined;
                } else if (rgx_llaves.test(input)) {
                    try {
                        input = JSON.parse(input);
                    } catch (error) {
                        window.cw("Parámetro inválido: " + error, 0);
                    }
                } else if (rgx_chtes.test(input)) {
                    try {
                        input = JSON.parse(input);
                    } catch (error) {
                        window.cw("Parámetro inválido: " + error, 0);
                    }
                } else {
                    let backup = input;
                    input = parseInt(input, 10);
                    if (isNaN(input)) {
                        input = backup;
                    }
                }
            }
            argumentos.push(input);
        });

        try {
            funcion(...argumentos);
        } catch (error) {
            window.cw("Error en la Función: " + error, 0);
        }
    }

    exp_fun(event) {
        const boton = event.currentTarget;
        const div_cont = boton.parentNode.nextElementSibling;
        const style = div_cont.style;


        const e_first = div_cont.getAttribute("data-first");
        if (e_first == "1") {
            div_cont.setAttribute("data-first", "0");
            div_cont.addEventListener("transitionend", (event) => {
                if (event.propertyName === "height") {
                    if (style.height == div_cont.scrollHeight + "px") {
                        style.height = null;
                    }
                }
            });
        }

        boton.classList.toggle("rotate");

        if (style.height == "0px") {
            style.height = div_cont.scrollHeight + "px"
            
        } else {
            style.height = div_cont.scrollHeight + "px";
            div_cont.scrollHeight;
            style.height = 0;
        }
    }

    exp_arc(event) {
        const boton = event.currentTarget;
        const h_encabezado = boton.parentNode.scrollHeight + "px";
        const div_cont = boton.parentNode.parentNode;
        const style = div_cont.style;

        const e_first = div_cont.getAttribute("data-first");
        if (e_first == "1") {
            div_cont.setAttribute("data-first", "0");
            div_cont.addEventListener("transitionend", (event) => {
                if (event.propertyName === "height") {
                    if (style.height == div_cont.scrollHeight + "px") {
                        style.height = null;
                    }
                }
            });
        }

        boton.classList.toggle("rotate");

        if (style.height == h_encabezado) {
            style.height = div_cont.scrollHeight + "px";
        } else {
            style.height = div_cont.scrollHeight + "px";
            div_cont.scrollHeight;
            style.height = h_encabezado;
        }
    }

    render() {
        if (this.num_archivos == this.num_rutas_archivos) {
            return html`
                ${Object.entries(this.archivos).map(
                    ([n_archivo, funciones]) =>
                        html`
                            <div class="envolt-archivo" data-first="1">
                                <section class="encabezado">
                                    <h2 class="text-archivo">${n_archivo}</h2>
                                    <button class="boton-expand boton-expand-title" @click="${this.exp_arc}">${unsafeHTML(svg_flecha)}</button>
                                </section>
                                ${Object.entries(funciones).map(
                                    ([nomfuncion, funcion]) =>
                                        html`
                                            <section class="envolt-funcion" >
                                                <div class="div-nombre-funcion">
                                                    <span class="nombre-funcion">${nomfuncion +"()"}</span>
                                                    <button class="boton-expand" @click="${this.exp_fun}">${unsafeHTML(svg_flecha)}</button>
                                                </div>
                                                <section class="formulario" data-first="1">
                                                    <div class="botones">
                                                        <button @click="${(event) => this.ejecutar_f(event, funcion["referencia"])}" class="ejecutar">Ejecutar Test</button>
                                                        <button @click="${this.limpiar}" class="ejecutar">Limpiar</button>
                                                    </div>
                                                    <div class="inputs">
                                                        ${funcion["argumentos"].map(
                                                            (argumentos) =>
                                                                html`
                                                                    <input placeholder=${argumentos} class="argumento" />
                                                                `
                                                        )}
                                                    </div>
                                                </section>
                                            </section>
                                        `
                                )}
                            </div>
                        `
                )}
            `;
        }
    }
}
customElements.define("list-funciones", listfunciones);
