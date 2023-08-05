import * as core from "@actions/core";
import github from "./github-client";
export default class Resource {
    constructor() {
        this.debug = core.debug;
        this.github = github;
    }
    graphql(query, variables) {
        const body = {
            query,
            variables,
        };
        return this.github.post(`/graphql`, body);
    }
}
