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
    // const response = await this.graphql(
    //   `mutation CreateDiscussion(
    //     $body: String!
    //     $title: String!
    //     $repositoryId: ID!
    //     $categoryId: ID!
    //   ) {
    //     # input type: CreateDiscussionInput
    //     createDiscussion(
    //       input: {
    //         repositoryId: $repositoryId
    //         categoryId: $categoryId
    //         body: $body
    //         title: $title
    //       }
    //     ) {
    //       # response type: CreateDiscussionPayload
    //       discussion {
    //         id
    //         url
    //       }
    //     }
    //   }
    //   `,
    //   {
    //     body: this.body,
    //     title: this.title,
    //     repositoryId: this.repositoryId,
    //     categoryId: this.categoryId,
    //   }
      
    // );
    const response = await this.graphql(
      `mutation CreateDiscussion(
        $body: String!
        $title: String!
        $repositoryId: ID!
        $categoryId: ID!
      ) {
        createDiscussion(
          input: {
            repositoryId: $repositoryId
            categoryId: $categoryId
            body: $body
            title: $title
          }
        ) {
          discussion {
            id
            url
          }
        }
      }`,
      {
        body: this.body,
        title: this.title,
        repositoryId: this.repositoryId,
        categoryId: this.categoryId,
      }
    );
    // core.debug('GraphQL Response: ' + util.inspect(response, { depth: null }));
    console.log('GraphQL Response:', response);

    // this.id = (response.data as ResponseShape).data.createDiscussion.discussion.id;
    // this.url = (response.data as ResponseShape).data.createDiscussion.discussion.url;

    // try {
    //   this.id = (response.data as ResponseShape).data.createDiscussion.discussion.id;
    //   this.url = (response.data as ResponseShape).data.createDiscussion.discussion.url;
    // } catch (err) {
    //   console.error('Error extracting discussion details:', err);
    //   // You might throw the error or handle it in some other way here
    // }

    // this.debug(`Discussion Created id: ${this.id}, url: ${this.url}`);

    const responseData: any = response.data;

    if (responseData.errors) {
      console.error('GraphQL Errors:', responseData.errors);
      throw new Error('Error executing GraphQL mutation');
    }
    
    if (responseData.data && responseData.data.createDiscussion) {
      this.id = responseData.data.createDiscussion.discussion.id;
      this.url = responseData.data.createDiscussion.discussion.url;
      this.debug(`Discussion Created id: ${this.id}, url: ${this.url}`);
    } else {
      throw new Error('Unexpected response shape');
    }
}
}
