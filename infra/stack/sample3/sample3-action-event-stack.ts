import * as base from '../../../lib/template/stack/devops/pipeline-base-stack';
import { AppContext } from '../../../lib/template/app-context';
import { Override } from '../../../lib/template/stack/base/base-stack';

import * as pipeline from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample3ActionEventStack extends base.PipelineBaseStack {
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
                EventStateLambda: {
                    CodePath: 'code/lambda/cicd-event-state',
                    Handler: 'handler.handle',
                    Runtime: 'python3.7'
                },
                Detail: {
                    AppConfigFile: "config/app-config-sample1.json",
                    BuildDeployStacks: {
                        StackNameList: ['Sample1Service1Stack'],
                    }
                }
            }
        ];
    }

}
