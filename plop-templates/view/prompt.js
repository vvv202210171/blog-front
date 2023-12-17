const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [
    {
      type: 'input',
      name: '_module',
      message: '请输入模块名称 （mc | merchant | payment | permission | system | user | xpay）',
      validate: notEmpty('_module')
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入名称 例 ｜ userList / orderList',
      validate: notEmpty('name')
    }
  ],
  actions: data => {
    const _module = '{{_module}}'
    const name = '{{name}}'
    const actions = [
      {
        type: 'add',
        path: `src/06-views/${_module}/config/${name}.js`,
        templateFile: 'plop-templates/config/index.hbs'
      },
      {
        type: 'add',
        path: `src/06-views/${_module}/${name}.vue`,
        templateFile: 'plop-templates/view/index.hbs',
        data: {
          name: name,
          template: true,
          script: true,
          style: true
        }
      }]

    return actions
  }
}
