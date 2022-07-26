import {
  FASTElement,
  customElement,
  html,
  observable,
  attr,
  volatile,
  when,
  css,
} from "@microsoft/fast-element";

export type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: "";
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type User = {
  name: GitHubUser["name"];
  avatarURL: GitHubUser["avatar_url"];
  htmlURL: GitHubUser["html_url"];
};

export const emptyMessage = "name attribute has no value...😔";
export const loadingMessage = "Loading...⏳";

const emptyNameTemplate = html`
  <p class="empty">
    <span>${emptyMessage}</span>
  </p>
`;

const emptyNameTemplateStyle = css`
  .empty {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .empty span {
    text-align: left;
  }
`;

const loadingTemplate = html`
  <p class="loading">
    <span>${loadingMessage}</span>
  </p>
`;

const loadingTemplateStyle = css`
  .loading {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .loading span {
    text-align: left;
  }
`;

const userTemplate = html<Element>`
  <div class="info">
    <div class="avatar">
      <img
        class="avatarImage"
        src=${(x) => x.user.avatarURL}
        alt
        width="460"
        height="460"
      />
    </div>
    <div class="detail">
      <div class="detailInner">
        <p>name: ${(x) => x.user.name}</p>
        <p class="url">
          url:
          <a href="${(x) => x.user.htmlURL}" target="noreferrer">
            ${(x) => x.user.htmlURL}
          </a>
        </p>
      </div>
    </div>
  </div>
`;

const userTemplateStyle = css`
  .avatar {
    text-align: center;
  }
  .avatarImage {
    width: min(50%, 160px);
    height: auto;
    margin-inline: inline;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 2px solid lightgray;
  }
  .detail {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .detailInner {
    width: fit-content;
  }
  .infoInner > * {
    margin: 0;
  }
  .infoInner > * + * {
    margin-top: 8px;
  }
  .url {
    overflow-wrap: anywhere;
  }
  .url a {
    color: inherit;
  }
`;

const template = html<Element>`
  <section>
    ${when((x) => !x.hasName, html<Element>`${emptyNameTemplate}`)}
    ${when(
      (x) => x.hasName,
      html<Element>`
        ${when((x) => x.loading, html<Element>`${loadingTemplate}`)}
        ${when((x) => !x.loading, html<Element>`${userTemplate}`)}
      `
    )}
  </section>
`;

const styles = css`
  :host {
    box-sizing: border-box;
    font-family: "Gill Sans", sans-serif;
  }
  :host([hidden]) {
    display: none;
  }
  :host * {
    box-sizing: inherit;
  }
  section {
    padding: 16px;
    border: 2px solid lightgray;
  }
  ${emptyNameTemplateStyle}
  ${loadingTemplateStyle}
  ${userTemplateStyle}
`;

@customElement({
  name: "mojahige-github-user",
  template,
  styles,
})
export class Element extends FASTElement {
  url = "https://api.github.com/users/";
  @attr name = "";
  @observable user: User = {
    name: "",
    avatarURL: "",
    htmlURL: "",
  };

  @volatile
  get hasName() {
    return !!this.name;
  }

  @volatile
  get githubURL() {
    return `${this.url}${this.name}`;
  }

  @volatile
  get hasUser() {
    return !!this.user?.name;
  }

  @volatile
  get loading() {
    return this.hasName && !this.hasUser;
  }

  async getUser(): Promise<GitHubUser> {
    const response = await fetch(this.githubURL);

    return response.json().then((data) => data);
  }

  async connectedCallback() {
    super.connectedCallback();

    if (!this.name) {
      return;
    }

    const { name, avatar_url, html_url } = await this.getUser();

    this.user = { name, avatarURL: avatar_url, htmlURL: html_url };
  }
}
