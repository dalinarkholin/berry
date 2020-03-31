import {Plugin, SettingsType, Hooks as CoreHooks, Project, StreamReport, MessageName, Report} from '@yarnpkg/core';

import {InstallOptions}                                                                       from 'packages/yarnpkg-core/sources/Project';

import {Stream}                                                                               from 'stream';

import queryConstraints                                                                       from './commands/constraints/query';
import sourceConstraints                                                                      from './commands/constraints/source';
import constraints                                                                            from './commands/constraints';

const plugin: Plugin<CoreHooks> = {

  configuration: {
    constraintsPath: {
      description: `The path of the constraints file.`,
      type: SettingsType.ABSOLUTE_PATH,
      default: `./constraints.pro`,
    },
    enableConstraintsValidation: {
      description: `If true, constraints will be run during the afterAllInstalled hook during the yarn install process`,
      type: SettingsType.BOOLEAN,
      default: false,
    },
  },
  commands: [
    queryConstraints,
    sourceConstraints,
    constraints,
  ],
  hooks: {
    afterAllInstalled: (project: Project, opts: InstallOptions) => {
      const util = require('util');
      const exec = util.promisify(require('child_process').exec);
      var cmd = 'yarn constraints';

      async function ls() {
        const {stdout} = await exec(cmd);
        // console.log(stdout)
        opts.report.reportInfo(MessageName.UNNAMED, stdout);

        // if (report.hasErrors()) {
        //   return report.exitCode();
        // }
      }
      ls();
    },
  },
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
