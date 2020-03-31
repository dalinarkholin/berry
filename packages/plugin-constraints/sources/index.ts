import {Plugin, SettingsType, Hooks as CoreHooks, Project} from '@yarnpkg/core';

import queryConstraints                                    from './commands/constraints/query';
import sourceConstraints                                   from './commands/constraints/source';
import constraints                                         from './commands/constraints';

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
    afterAllInstalled: (project: Project) => {
      const {exec} = require('child_process');
      var cmd = 'yarn constraints';

      exec(cmd, function(error: any, stdout: any, stderr: any) {
        if (error)
          // node couldn't execute the command
          return;


        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    },
  },
};

// eslint-disable-next-line arca/no-default-export
export default plugin;
