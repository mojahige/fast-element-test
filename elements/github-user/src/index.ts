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

type GitHubUser = {
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

type User = Partial<Pick<GitHubUser, "name" | "avatar_url" | "url">>;

const emptyNameTemplate = html`
  <p class="empty">
    <span>name attribute has no value...😔</span>
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
    <span>Loading...</span>
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
  <div>
    <div class="avaterContainer">
      <img
        class="avater"
        src=${(x) => x.user.avatar_url}
        alt
        width="460"
        height="460"
      />
    </div>
    <div class="info">
      <div class="infoInner">
        <p>name: ${(x) => x.user.name}</p>
        <p class="url">
          url: <a href="${(x) => x.user.url}">${(x) => x.user.url}</a>
        </p>
      </div>
    </div>
  </div>
`;

const userTemplateStyle = css`
  .avaterContainer {
    text-align: center;
  }
  .avater {
    width: min(50%, 160px);
    height: auto;
    margin-inline: inline;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 2px solid lightgray;
  }
  .info {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .infoInner {
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
    ${when((x) => !x.name, html<Element>`${emptyNameTemplate}`)}
    ${when((x) => x.name && !x.hasUser, html<Element>`${loadingTemplate}`)}
    ${when((x) => x.hasUser, html<Element>`${userTemplate}`)}
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
  @observable user: User = {};

  @volatile
  get githubURL() {
    return `${this.url}${this.name}`;
  }

  @volatile
  get hasUser() {
    return this.user.name;
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

    const { name, avatar_url, url } = await this.getUser();

    this.user = { name, avatar_url, url };
  }
}
