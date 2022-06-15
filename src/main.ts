import * as core from "@actions/core";
import * as github from "@actions/github";
import { requestChanges } from "./request-changes";

async function run() {
  const changesRequired = Boolean(
    JSON.parse(core.getInput("changes-required", { required: true }))
  );
  const token = core.getInput("github-token", { required: true });
  const commentBody = core.getInput("comment-body", { required: true });
  const prNumber: number = parseInt(core.getInput("pull-request-number"), 10);
  if (!Number.isNaN(prNumber)) {
    await requestChanges(
      changesRequired,
      token,
      github.context,
      commentBody,
      prNumber
    );
  } else {
    await requestChanges(changesRequired, token, github.context, commentBody);
  }
}

run();
