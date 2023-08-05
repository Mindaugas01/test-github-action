import * as core from "@actions/core";

import getInput from "./lib/input";
import { Discussion } from "./lib/discussion";
const fs = require('fs')

export default async function run(): Promise<void> {
  try {
    const repositoryId = getInput("repository-id");
    const categoryId = getInput("category-id");
    const title = getInput("title");
    var body = getInput("body");
    const body_filepath = getInput("body-filepath");
    console.log('repository ID:', repositoryId);
    console.log('category ID:', categoryId);
    console.log('title ID:', title);
    console.log('body:', body);
    //if body-filepath is set, use it instead of body
    if (body_filepath) {
      body = fs.readFileSync(body_filepath, "utf8");
    }
    // Load Discussion details
    
    if (repositoryId === null) {
      throw new Error("repository-id is missing or invalid.");
    }

    if (categoryId === null) {
      throw new Error("categoryId is missing or invalid.");
    }

    if (title === null) {
      throw new Error("title is missing or invalid.");
    }

    if (body === null) {
      throw new Error("title is missing or invalid.");
    }

    
    const discussion = new Discussion(repositoryId, categoryId, title, body);
    console.log("Discussion:", discussion);

    if (discussion !== null) {
      // 'discussion' is not null, you can access its properties safely here
      console.log(discussion.id);
      console.log(discussion.url);
    } else {
      // 'discussion' is null, handle the case where it is not initialized or has a null value
      console.log("discussion is null or not initialized.");
    }
    await discussion.save();

    // Set commit sha output
    core.setOutput("discussion-id", discussion.id);
    core.setOutput("discussion-url", discussion.url);
  } catch (e) {
    core.debug(e.stack);
    core.setFailed(e);
  }
}

run();
