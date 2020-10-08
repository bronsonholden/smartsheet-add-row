const core = require('@actions/core');
const github = require('@actions/github');
const Smartsheet = require('smartsheet');

async function run() {
  try {
    const accessToken = core.getInput('access-token');
    const sheetId = core.getInput('sheet-id');
    const smartsheet = Smartsheet.createClient({
      accessToken
    });

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
