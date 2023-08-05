import * as core from "@actions/core";
import Resource from "./resource";
import * as util from 'util';

export class Discussion2 extends Resource {
  url: string;
  id: string;
  constructor(
    readonly repositoryId: string,
    readonly categoryId: string,
    readonly title: string,
    readonly body: string
  ) {
    super();
  }

  async load(): Promise<void> {
    throw new Error("Not implemented");
  }

  async update(): Promise<void> {
    throw new Error("Not implemented");
  }

  async save(): Promise<void> {
    type ResponseShape = {
      data: {
        createDiscussion: {
          discussion: {
            id: string;
            url: string;
          };
        };
      };
    };

    console.log('Save repositoryID', this.repositoryId);
    console.log('Save category ID:', this.categoryId);
    console.log('Save title ID:', this.title);
    console.log('Save body:', this.body);
    const response = await this.graphql(
      `mutation CreateDiscussion(
        $body: String!
        $title: String!
        $repositoryId: ID!
        $categoryId: ID!
      ) {
        # input type: CreateDiscussionInput
        createDiscussion(
          input: {
            repositoryId: $repositoryId
            categoryId: $categoryId
            body: $body
            title: $title
          }
        ) {
          # response type: CreateDiscussionPayload
          discussion {
            id
            url
          }
        }
      }
      `,
      {
        body: this.body,
        title: this.title,
        repositoryId: this.repositoryId,
        categoryId: this.categoryId,
      }
      
    );
    // core.debug('GraphQL Response: ' + util.inspect(response, { depth: null }));
    // console.log('GraphQL Response:', response);
    this.id = (response.data as ResponseShape).data.createDiscussion.discussion.id;
    this.url = (response.data as ResponseShape).data.createDiscussion.discussion.url;

    this.debug(`Discussion Created id: ${this.id}, url: ${this.url}`);
  }
}
