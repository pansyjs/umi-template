import chalk from 'chalk';
import execa from 'execa';

export function getErrorAndLog(prefix: string) {
  function logStep(name) {
    console.log(`${chalk.gray(`>> ${prefix}:`)} ${chalk.magenta.bold(name)}`);
  }

  function printErrorAndExit(message) {
    console.error(chalk.red(`>> ${prefix}: ${message}`));
    process.exit(1);
  }

  return {
    logStep,
    printErrorAndExit
  };
}

export function isStageEmpty() {
  return execa.sync('git', ['diff', '--cached']).stdout === '';
}
