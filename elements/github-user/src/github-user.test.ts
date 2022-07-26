import { it, expect, vi } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import { Element, emptyMessage, loadingMessage } from "./index";
import type { User, GitHubUser } from "./index";
// import "./index";

it("if no name is given", async () => {
  const element = await fixture<Element>(
    html`<mojahige-github-user></mojahige-github-user>`
  );

  expect(element.shadowRoot?.querySelector("p")?.textContent?.trim()).toBe(
    emptyMessage
  );
});

it("A message is displayed during loading", async () => {
  vi.spyOn(Element.prototype, "hasUser", "get").mockReturnValue(false);

  const element = await fixture<Element>(
    html`<mojahige-github-user name=${"mojahige"}></mojahige-github-user>`
  );

  expect(element.shadowRoot?.querySelector("p")?.textContent?.trim()).toBe(
    loadingMessage
  );
});

it("User information is displayed", async () => {
  const dummyUser: User = {
    name: "mojahige",
    url: "/mojahige",
    avatar_url: "mojahige",
  };

  vi.spyOn(Element.prototype, "getUser").mockReturnValue(
    Promise.resolve(dummyUser as GitHubUser)
  );

  const element = await fixture<Element>(
    html`<mojahige-github-user name=${dummyUser.name}></mojahige-github-user>`
  );
  const shadowRoot = element.shadowRoot;

  expect(shadowRoot?.querySelector("img")?.getAttribute("src")).toBe(
    dummyUser.avatar_url
  );
  // expect(
  //   shadowRoot
  //     ?.querySelector(".info")
  //     ?.textContent?.includes(dummyUser.name as string)
  // ).toBe(true);
  // expect(
  //   shadowRoot
  //     ?.querySelector<HTMLAnchorElement>(".info a")
  //     ?.getAttribute("href")
  // ).toBe(dummyUser.url);
});
