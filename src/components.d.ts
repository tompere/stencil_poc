/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MockCustomElement {
        "wham": string;
    }
    interface MockTrojan {
    }
}
declare global {
    interface HTMLMockCustomElementElement extends Components.MockCustomElement, HTMLStencilElement {
    }
    var HTMLMockCustomElementElement: {
        prototype: HTMLMockCustomElementElement;
        new (): HTMLMockCustomElementElement;
    };
    interface HTMLMockTrojanElement extends Components.MockTrojan, HTMLStencilElement {
    }
    var HTMLMockTrojanElement: {
        prototype: HTMLMockTrojanElement;
        new (): HTMLMockTrojanElement;
    };
    interface HTMLElementTagNameMap {
        "mock-custom-element": HTMLMockCustomElementElement;
        "mock-trojan": HTMLMockTrojanElement;
    }
}
declare namespace LocalJSX {
    interface MockCustomElement {
        "wham"?: string;
    }
    interface MockTrojan {
    }
    interface IntrinsicElements {
        "mock-custom-element": MockCustomElement;
        "mock-trojan": MockTrojan;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mock-custom-element": LocalJSX.MockCustomElement & JSXBase.HTMLAttributes<HTMLMockCustomElementElement>;
            "mock-trojan": LocalJSX.MockTrojan & JSXBase.HTMLAttributes<HTMLMockTrojanElement>;
        }
    }
}
