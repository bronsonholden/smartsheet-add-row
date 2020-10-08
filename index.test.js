const run = require('.');
const core = require('@actions/core');

const mockAddRows = jest.fn();

jest.mock('@actions/core');
jest.mock('smartsheet', () => ({
  createClient: jest.fn(() => ({
    sheets: {
      addRows: mockAddRows
    }
  }))
}));

describe('Add row to Smartsheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockInputs = {
      'access-token': 'my-access-token',
      'sheet-id': 'my-sheet-id'
    };

    core.getInput = jest.fn(name => mockInputs[name]);
  });

  test('adds row to the sheet', async () => {
    const rowId = 12345;

    mockAddRows.mockImplementation(() => Promise.resolve({
      result: {
        id: rowId
      }
    }));

    await run();
    expect(mockAddRows).toHaveBeenCalledTimes(1);
    expect(core.setFailed).toHaveBeenCalledTimes(0);
    expect(core.setOutput).toHaveBeenCalledTimes(1);
    expect(core.setOutput).toHaveBeenLastCalledWith('row-id', rowId);
  });

  test('error adding row to sheet', async () => {
    mockAddRows.mockImplementation(() => Promise.reject('Some error occurred while adding the row'));

    await run();
    expect(mockAddRows).toHaveBeenCalledTimes(1);
    expect(core.setFailed).toHaveBeenCalledTimes(1);
    expect(core.setOutput).toHaveBeenCalledTimes(0);
  });
});
