* role of parsing and formatting pipelines:
** parse: ui->model
** format: model->ui
** validation
* patterns:
** failed parsing binds `undefined` to the model
** failed formatting should result in `undefined` being returned
* testing:
** it is good to test parsing / formatting functions in isolation
** DOM-based testing requires a bit of gymnastic to trigger input changes (different on different browsers)