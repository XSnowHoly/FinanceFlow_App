module.exports = {
  // 这里配置type的option值，可自行调整顺序或修改文案
  types: [
    {
      value: 'feat',
      name: 'feat(新功能): 向现有功能添加新功能或改进',
    },
    {
      value: 'fix',
      name: 'fix(修复): 修复代码库中的bug或者issues',
    },
    {
      value: 'chore',
      name: 'chore(任务): 构建/工程依赖/工具/文档更新/格式化',
    },
    {
      value: 'docs',
      name: 'docs(文档): 为代码库更新文档',
    },
    {
      value: 'style',
      name: 'style(样式): 改善代码库的格式或风格, 修改页面样式',
    },
    {
      value: 'refactor',
      name: 'refactor(重构): 对代码库的结构或组织进行重组或改进',
    },
    {
      value: 'perf',
      name: 'perf(性能): 代码库性能优化',
    },
    {
      value: 'init',
      name: 'init(初始化): 项目初始化',
    },
    {
      value: 'test',
      name: 'test(测试): 自动化测试',
    },
    {
      value: 'revert',
      name: 'revert(回退): 撤销之前某个提交',
    },
    {
      value: 'build',
      name: 'build(构建): 重构系统编译配置',
    },
  ],
  // 每一步的提示信息
  messages: {
    type: '请选择提交类型',
    scope: '请选择文件修改范围',
    subject: '请输入commit标题(必填)',
    body: '请输入commit描述, 可通过&换行(选填)',
    // breaking: '列出任何BREAKING CHANGES(破坏性修改)(可选)',
    // footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确定提交此 commit 吗？',
  },
  // 配置scope可选项，mono项目可按子项目维度划分，非mono项目可按功能or业务模块划分
  scopes: [
    { name: '全局' },
    { name: '账单模块' },
    { name: '用户中心' },
    { name: '登录注册' },
    { name: '其他' },
  ],
  // commit描述的换行符
  breaklineChar: '&',
  skipQuestions: ['breaking', 'footer'],
  // 标题首字母大写
  upperCaseSubject: true,
  // 标题必填
  requiredSubject: true,
};
