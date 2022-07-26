import { it, expect, vi } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import { Element, emptyMessage, loadingMessage } from "./index";
import type { User, GitHubUser } from "./index";
// import "./index";

it("If there is no value for name, a dedicated message is displayed.", async () => {
  const element = await fixture<Element>(
    html`<mojahige-github-user></mojahige-github-user>`
  );

  expect(element.shadowRoot?.querySelector(".empty")?.textContent?.trim()).toBe(
    emptyMessage
  );
  expect(element.shadowRoot?.querySelector(".loading")).toBe(null);
  expect(element.shadowRoot?.querySelector(".info")).toBe(null);
});

it("If there is no value for name, loading and info are not displayed.", async () => {
  const element = await fixture<Element>(
    html`<mojahige-github-user></mojahige-github-user>`
  );

  expect(element.shadowRoot?.querySelector(".loading")).toBe(null);
  expect(element.shadowRoot?.querySelector(".info")).toBe(null);
});

it("Loading is displayed while user information is being acquired.", async () => {
  vi.spyOn(Element.prototype, "hasUser", "get").mockReturnValue(false);

  const element = await fixture<Element>(
    html`<mojahige-github-user name=${"mojahige"}></mojahige-github-user>`
  );

  expect(
    element.shadowRoot?.querySelector(".loading")?.textContent?.trim()
  ).toBe(loadingMessage);
});

it("empty and info are not displayed while user information is being retrieved.", async () => {
  vi.spyOn(Element.prototype, "hasUser", "get").mockReturnValue(false);

  const element = await fixture<Element>(
    html`<mojahige-github-user name=${"mojahige"}></mojahige-github-user>`
  );

  expect(element.shadowRoot?.querySelector(".empty")).toBe(null);
  expect(element.shadowRoot?.querySelector(".info")).toBe(null);
});

it("User information is displayed", async () => {
  const dummyGitHubUser: Pick<GitHubUser, "name" | "avatar_url" | "html_url"> =
    {
      name: "mojahige",
      avatar_url: "/mojahige",
      html_url: "mojahige",
    };
  const dummyUser: User = {
    name: "mojahige",
    avatarURL: "/mojahige",
    htmlURL: "mojahige",
  };

  vi.spyOn(Element.prototype, "getUser").mockReturnValue(
    Promise.resolve(dummyGitHubUser as GitHubUser)
  );

  const element = await fixture<Element>(
    html`<mojahige-github-user name=${dummyUser.name}></mojahige-github-user>`
  );
  const shadowRoot = element.shadowRoot;

  expect(shadowRoot?.querySelector(".avatarImage")?.getAttribute("src")).toBe(
    dummyUser.avatarURL
  );
  expect(
    shadowRoot
      ?.querySelector(".detail")
      ?.textContent?.includes(dummyUser.name as string)
  ).toBe(true);
  expect(
    shadowRoot
      ?.querySelector<HTMLAnchorElement>(".detail a")
      ?.getAttribute("href")
  ).toBe(dummyUser.htmlURL);
});
