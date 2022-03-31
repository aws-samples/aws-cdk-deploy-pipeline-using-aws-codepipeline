import * as base from '../../../lib/template/stack/devops/pipeline-base-stack';
import { AppContext } from '../../../lib/template/app-context';
import { Override } from '../../../lib/template/stack/base/base-stack';

import * as pipeline from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample3CrossAccountStack extends base.PipelineBaseStack {

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);
    }

    @Override
    onPostConstructor(pipeline: pipeline.PipelineSimplePattern): void {
    }

    @Override
    onPipelineName(): string {
        return 'MultiTargetPipeline';
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
                Name: 'TestDeployStacks',
                Stage: "TestStage",
                Kind: pipeline.ActionKind.BuildCodeBuild,
                Enable: true,
                Detail: {
                    AppConfigFile: "config/app-config-sample3-test.json",
                    BuildDeployStacks: {
                        PreCommands: ['aws sts get-caller-identity'],
                        StackNameList: ['Sample3Service1Stack'],
                    }
                }
            },
            {
                Name: 'ApproveManually',
                Stage: 'ApproveStage',
                Kind: pipeline.ActionKind.ApproveManual,
                Enable: true,
                Detail: {
                    Description: 'Must check stacks before prod'
                }
            },
            {
                Name: 'ProdDeployStacks',
                Stage: "ProdStage",
                Kind: pipeline.ActionKind.BuildCodeBuild,
                Enable: true,
                Detail: {
                    AppConfigFile: "config/app-config-sample3-prod-cross.json",
                    BuildDeployStacks: {
                        PreCommands: ['aws sts get-caller-identity'],
                        StackNameList: ['Sample3Service1Stack'],
                    },
                    BuildAssumeRoleArn: 'arn:aws:iam::[your account number]:role/[your assume-role name]'
                }
            }
        ];
    }

}
