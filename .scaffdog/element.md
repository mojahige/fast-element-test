---
name: "element"
root: "elements"
output: "*"
ignore: []
questions:
  value: "Please enter element name."
---

# `{{ inputs.value | lower }}/README.md`

```markdown
# @mojahige/{{ inputs.value | lower }}

## How to use

{{ "```html" }}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Document</title>

    <script type="importmap">
      {
        "imports": {
          "@microsoft/fast-element": "https://cdn.jsdelivr.net/npm/@microsoft/fast-element/dist/fast-element.min.js"
        }
      }
    </script>
    <script type="module" src="./dist/mojahige-{{ inputs.value | lower }}.js"></script>
  </head>
  <body>
    <mojahige-{{ inputs.value | lower }}></mojahige-{{ inputs.value | lower }}>
  </body>
</html>
{{ "```" }}
{{ noop }}
```

# `{{ inputs.value | lower }}/tsconfig.json`

```json
{
  "extends": "../../tsconfig.element.json"
}
{{ noop }}
```

# `{{ inputs.value | lower }}/package.json`

```json
{
  "name": "@mojahige/{{ inputs.value | lower }}",
  "author": "mojahige (Yu Nozato)",
  "private": true,
  "main": "dist/index.js",
  "scripts": {
    "build": "esbuild src/index.ts --outfile=dist/mojahige-{{ inputs.value | lower }}.js --minify",
    "test": "vitest"
  }
}
{{ noop }}
```

# `{{ inputs.value | lower }}/src/index.ts`

```typescript
import { FASTElement, customElement, html } from "@microsoft/fast-element";

const template = html<Element>` <p>${(x) => x.name}</p> `;

@customElement({
  name: "mojahige-{{ inputs.value | lower }}",
  template,
})
export class Element extends FASTElement {
  name = "{{ inputs.value | lower }}";
}
{{ noop }}
```

# `{{ inputs.value | lower }}/src/{{ inputs.value | lower }}.test.ts`

```typescript
import { it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import { Element } from "./index";
import "./index";

it("rendered", async () => {
  await fixture<Element>(
    html`<mojahige-{{ inputs.value | lower }}></mojahige-{{ inputs.value | lower }}>`
  );

  expect(document.querySelector("mojahige-{{ inputs.value | lower }}")).not.toBe(null);
});
{{ noop }}
```

# `{{ inputs.value | lower }}/src/{{ inputs.value | lower }}.stories.ts`

```typescript
import { Meta, Story } from "@storybook/web-components";
import { html } from "lit-html";
import "./index";

export default {
  title: "elements/{{ inputs.value | lower | pascal }}",
} as Meta;

export const {{ inputs.value | lower | pascal }}: Story = () => html`<mojahige-{{ inputs.value | lower }}></mojahige-{{ inputs.value | lower }}>`;
{{ noop }}
```
