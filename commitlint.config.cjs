module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  //git commit -m "fix: 解决了登录bug"
  //跳过校验：git commit -m "your message" --no-verify
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更新
        'style', // 代码样式调整（不影响逻辑）
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 测试相关
        'chore', // 构建或工具链更新
        'revert', // 回滚提交
        'build', // 构建相关
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
