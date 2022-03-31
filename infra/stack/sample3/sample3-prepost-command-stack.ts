import * as base from '../../../lib/template/stack/devops/pipeline-base-stack';
import { AppContext } from '../../../lib/template/app-context';
import { Override } from '../../../lib/template/stack/base/base-stack';

import * as pipeline from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample3PrePostCommandStack extends base.PipelineBaseStack {
    private pipeline: pipeline.PipelineSimplePattern;

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);
    }

    @Override
    onPostConstructor(pipeline: pipeline.PipelineSimplePattern): void {
        this.pipeline = pipeline;
    }

    @Override
    onPipelineName(): string {
        return 'Approach2Pipeline';
    }

    @Override
    onActionFlow(): pipeline.ActionProps[] {
        return [
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
                Name: 'DeployStack1',
                Stage: "DevDeployStage",
                Kind: pipeline.ActionKind.BuildCodeBuild,
                Enable: false,
                Detail: {
                    AppConfigFile: "config/app-config-sample1.json",
                    BuildDeployStacks: {
                        PreCommands: [
                            'npm install --prefix code/lambda/api',
                            'pytest code/lambda/api/test'
                        ],
                        StackNameList: ['Sample1Service1Stack'],
                        PostCommands: [
                            'aws s3 sync code/lambda/api/report s3://aaa/bb/cc'
                        ]
                    }
                }
            }
        ];
    }

}
