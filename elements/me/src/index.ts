import { FASTElement, customElement, html } from "@microsoft/fast-element";

const template = html<Element>` <p>${(x) => x.name}</p> `;

@customElement({
  name: "mojahige-me",
  template,
})
export class Element extends FASTElement {
  name = "mojahige";
}
