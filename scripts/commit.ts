import inquirer from 'inquirer';
import chalk from 'chalk';
import execa from 'execa';

const emojiConfig = require('../emoji.json');

interface CommitInfo {
  type: string;
  scope?: string;
  subject: string;
  body?: string;
  footer?: string;
}

function printErrorAndExit(message) {
  console.error(chalk.red(`commit >> ${message}`));
  process.exit(1);
}

function isStageEmpty() {
  return execa.sync('git', ['diff', '--cached']).stdout === '';
}

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
      if (index === 0) {
        prev += `\n\n${curr}`;
      } else {
        prev += `\n${curr}`;
      }
      return prev;
    }, '');

    message += bodyMessage;
  }

  if (info.footer) {
    const footers = info.footer.split('\\n');

    const footerMessage = footers.reduce((prev, curr, index) => {
      if (index === 0) {
        prev += `\n\n${curr}`;
      } else {
        prev += `\n${curr}`;
      }
      return prev;
    }, '');

    message += footerMessage;
  }

  return message;
};

async function commit() {
  const types = emojiConfig.map((item) => {
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
      message: '请选择提交类型:',
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
      message: '请输入提交范围:',
      type: 'input'
    },
    {
      name: 'subject',
      message: '请输入提交简述:',
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
      message: '请输入提交详细信息:',
      type: 'input'
    },
    {
      name: 'footer',
      message: '请输入提交footer:',
      type: 'input'
    }
  ]);

  const message = getCommitMessage(reult);

  // 提交代码
  await execa.sync('git', ['commit', '--message', message]);

  console.log(chalk.green('commit >> 提交成功'));
}

commit();
