const core = require('@actions/core');
const github = require('@actions/github');
const smartsheet = require('smartsheet');

async function run() {
  try {
    const apiKey = core.getInput('api-key');
    const sheetId = core.getInput('sheet-id');

    await smartsheet.sheets.addRows({
      sheetId,
      body: {}
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

// istanbul ignore next
if (require.main === module) {
  run();
}
