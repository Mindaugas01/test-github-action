var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Resource from "./resource";
export class Discussion extends Resource {
    constructor(repositoryId, categoryId, title, body) {
        super();
        this.repositoryId = repositoryId;
        this.categoryId = categoryId;
        this.title = title;
        this.body = body;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.graphql(`mutation CreateDiscussion(
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
      `, {
                body: this.body,
                title: this.title,
                repositoryId: this.repositoryId,
                categoryId: this.categoryId,
            });
            this.id = response.data.data.createDiscussion.discussion.id;
            this.url = response.data.data.createDiscussion.discussion.url;
            this.debug(`Discussion Created id: ${this.id}, url: ${this.url}`);
        });
    }
}
