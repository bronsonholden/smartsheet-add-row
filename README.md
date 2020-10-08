# Smartsheet GitHub Action: Add row

A GitHub action that adds a single row to a Smartsheet. The row includes no
data, so you will have to use this action in conjunction with the
`update-smartsheet-row` action to populate the created row with data
in your workflow.

## Inputs

| Input name | Description |
|------------|-------------|
| access-token | Your Smartsheet API access token |
| sheet-id | The sheet ID to add a row to |

## Outputs

| Output name | Description |
|-------------|-------------|
| row-id | The created row ID |

## Sample workflow

This adds a row to a Smartsheet when an issue is opened in your
GitHub repository.

```yml
on:
  issues: [opened]

name: Add Smartsheet Row

jobs:
  add_row:
    name: Add Row
    runs-on: ubuntu-latest
    steps:
    - name: Add row
      id: add-row
      uses: paulholden2/smartsheet-add-row@v1
      with:
        access-token: ${{ secrets.SMARTSHEET_API_KEY }}
        sheet-id: ${{ secrets.SMARTSHEET_SHEET_ID }}
```
