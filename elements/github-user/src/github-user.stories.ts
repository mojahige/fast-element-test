import { Meta, Story } from "@storybook/web-components";
import { html } from "lit-html";
import "./index";

export default {
  title: "elements/GithubUser",
} as Meta;

export const GithubUser: Story = () =>
  html`<mojahige-github-user name="mojahige"></mojahige-github-user>`;
