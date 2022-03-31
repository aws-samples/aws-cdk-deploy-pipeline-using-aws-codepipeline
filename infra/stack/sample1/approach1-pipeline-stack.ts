import * as base from '../../../lib/template/stack/base/base-stack';
import { AppContext } from '../../../lib/template/app-context';

import * as pipeline from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Approach1PipelineStack extends base.BaseStack {

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);

        new pipeline.PipelineSimplePattern(this, 'Approach1', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Approach1Pipeline',
            actionFlow: [
                {
                    Name: 'GitClone',
                    Stage: 'SourceStage',
                    Kind: pipeline.ActionKind.SourceCodeCommit,
                    Enable: true,
                    Detail: {
                        RepositoryName: 'sample-repo',
                        BranchName: 'release_cicd'
                    }
                },
                {
                    Name: 'DeployAllStacks',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Detail: {
                        AppConfigFile: "config/app-config-sample1.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample1Service1Stack'],
                        }
                    }
                }
            ]
        });
    }
}
