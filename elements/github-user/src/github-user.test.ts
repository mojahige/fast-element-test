import { it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import { Element } from "./index";
import "./index";

it("rendered", async () => {
  await fixture<Element>(
    html`<mojahige-github-user></mojahige-github-user>`
  );

  expect(document.querySelector("mojahige-github-user")).not.toBe(null);
});
