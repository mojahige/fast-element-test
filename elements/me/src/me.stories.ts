import { Meta, Story } from "@storybook/web-components";
import { html } from "lit-html";
import "./index";

export default {
  title: "elements/Me",
} as Meta;

export const Me: Story = () => html`<mojahige-me></mojahige-me>`;
