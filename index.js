const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const rowData = core.getInput('row-data');
    console.log(rowData);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

// istanbul ignore next
if (require.main === module) {
  run();
}
