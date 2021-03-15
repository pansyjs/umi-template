import execa from 'execa';
import inquirer from 'inquirer';
import { CommitInfo } from './types';
import commitTypes from '../commit-types.json';
import { getErrorAndLog, isStageEmpty } from './utils';

const { printErrorAndExit, logStep } = getErrorAndLog(`commit`);

/**
 * 获取提交的信息
 * @param info 需要解析的配置
 * @returns 拼接的提交消息
 * @example
 *   🐛 fix(login): 修复登录按钮无法点击
 *
 *   详细的描述信息
 *
 *   Close #12
 */
const getCommitMessage = (info: CommitInfo) => {
  let message = `${info.type}`;

  if (info.scope) {
    message += `(${info.scope}): ${info.subject}`;
  } else {
    message += `: ${info.subject}`;
  }

  if (info.body) {
    const bodys = info.body.split('\\n');

    const bodyMessage = bodys.reduce((prev, curr, index) => {
      let msg = prev;
      if (index === 0) {
        msg += `\n\n${curr}`;
      } else {
        msg += `\n${curr}`;
      }
      return msg;
    }, '');

    message += bodyMessage;
  }

  if (info.footer) {
    const footers = info.footer.split('\\n');

    const footerMessage = footers.reduce((prev, curr, index) => {
      let msg = prev;
      if (index === 0) {
        msg += `\n\n${curr}`;
      } else {
        msg += `\n${curr}`;
      }
      return msg;
    }, '');

    message += footerMessage;
  }

  return message;
};

async function commit() {
  const types = commitTypes.map((item) => {
    const value = `${item.emoji} ${item.name}`;
    return {
      name: `${value}: ${item.description}`,
      value
    };
  });

  // 未修改任何文件
  const gitStatus = execa.sync('git', ['status', '--porcelain']).stdout;
  if (!gitStatus.length) {
    printErrorAndExit(`未修改任何文件。`);
  }

  // 未暂存文件
  if (isStageEmpty()) {
    printErrorAndExit(`不存在暂存文件。`);
  }

  // 获取message信息
  const reult: CommitInfo = await inquirer.prompt([
    {
      name: 'type',
      message: '请选择提交的类型:',
      type: 'list',
      choices: types,
      validate: (value: string) => {
        if (value) {
          return true;
        }
        return '提交类型不能为空';
      }
    },
    {
      name: 'scope',
      message: '请输入提交的范围(可选):',
      type: 'input'
    },
    {
      name: 'subject',
      message: '请输入提交的描述:',
      type: 'input',
      validate: (value: string) => {
        if (value) {
          return true;
        }
        return '提交简述不能为空';
      }
    },
    {
      name: 'body',
      message: '请输入提交的详细内容(可选):',
      type: 'input'
    },
    {
      name: 'footer',
      message: '请输入提交的页脚(可选):',
      type: 'input'
    }
  ]);

  const message = getCommitMessage(reult);

  logStep(`提交信息`);

  console.log(message);

  logStep(`提交代码`);

  // 提交代码
  await execa.sync('git', ['commit', '--message', `${message}`]);

  logStep(`提交代码到远端`);

  // 提交代码到远端
  await execa.sync('git', ['push']);
}

commit()
  .then(() => {
    logStep(`提交成功`);
    process.exit(0);
  })
  .catch(() => {
    logStep(`提交失败`);
    process.exit(1);
  });
