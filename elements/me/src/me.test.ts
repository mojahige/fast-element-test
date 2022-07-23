import { it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import { Element } from "./index";
import "./index";

it("rendered", async () => {
  await fixture<Element>(html`<mojahige-me></mojahige-me>`);

  expect(document.querySelector("mojahige-me")).not.toBe(null);
});

it("show name", async () => {
  const element = await fixture<Element>(html`<mojahige-me></mojahige-me>`);
  const paragraph = element.shadowRoot?.querySelector("p");

  expect(paragraph).not.toBe(null);
  expect(paragraph?.textContent).toBe("mojahige");
});
