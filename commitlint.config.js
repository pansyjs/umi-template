// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DEFAULT_TYPES } = require('@walrus/commit/lib/config');

const typeEnum = DEFAULT_TYPES.map((item) => `${item.emoji} ${item.name}`);

module.exports = {
  rules: {
    // Header
    'header-max-length': [2, 'always', 200],
    // <type>枚举
    'type-enum': [2, 'always', typeEnum],
    // <type> 不能为空
    // 'type-empty': [2, 'never'],
    // <type> 格式 小写
    'type-case': [2, 'always', 'lower-case'],
    // <scope> 格式 小写
    'scope-case': [2, 'always', 'lower-case'],
    // <subject> 不能为空
    // 'subject-empty': [2, 'never'],
    // <subject> 以.为结束标志
    'subject-full-stop': [2, 'never', '.'],
    // <subject> 格式
    // 可选值
    // 'lower-case' 小写 lowercase
    // 'upper-case' 大写 UPPERCASE
    // 'camel-case' 小驼峰 camelCase
    // 'kebab-case' 短横线 kebab-case
    // 'pascal-case' 大驼峰 PascalCase
    // 'sentence-case' 首字母大写 Sentence case
    // 'snake-case' 下划线 snake_case
    // 'start-case' 所有首字母大写 start-case
    'subject-case': [2, 'never', []],
    // <body> 以空行开头
    'body-leading-blank': [1, 'always'],
    // <footer> 以空行开头
    'footer-leading-blank': [1, 'always'],
    'emoji-type-rule': [2, 'never']
  },
  plugins: [
    {
      rules: {
        'emoji-type-rule': (rules) => {
          const result =
            rules.header.match(/^(.*\s\w*|\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$/) || [];

          rules.type = result[1];
          rules.scope = result[2];
          rules.subject = result[3];

          if (!rules.type) {
            return [rules.type, `type may not be empty`];
          }

          if (!rules.type) {
            return [rules.subject, `subject may not be empty`];
          }

          return [true, `success`];
        }
      }
    }
  ]
};
