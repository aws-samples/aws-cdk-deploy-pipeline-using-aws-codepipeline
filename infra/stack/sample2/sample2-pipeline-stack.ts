import * as base from '../../../lib/template/stack/base/base-stack';
import { AppContext } from '../../../lib/template/app-context';

import * as pipeline from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample2PipelineStack extends base.BaseStack {

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);

        this.createCase1Pipeline();
        this.createCase2Pipeline();
        this.createCase3Pipeline();
        this.createCase4Pipeline();
    }

    private createCase1Pipeline() {
        new pipeline.PipelineSimplePattern(this, 'case1', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Case1Pipeline',
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
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service1Stack', 'Sample2Service2Stack', 'Sample2Service3Stack'],
                        }
                    }
                }
            ]
        })
    }

    private createCase2Pipeline() {
        new pipeline.PipelineSimplePattern(this, 'case2', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Case2Pipeline',
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
                    Name: 'DeployService1Stack',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Order: 1,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service1Stack'],
                        }
                    }
                },
                {
                    Name: 'DeployService2Stack',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Order: 2,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service2Stack'],
                        }
                    }
                },
                {
                    Name: 'DeployService3Stack',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Order: 3,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service3Stack'],
                        }
                    }
                }
            ]
        })
    }

    private createCase3Pipeline() {
        new pipeline.PipelineSimplePattern(this, 'case3', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Case3Pipeline',
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
                    Name: 'DeployService1Stack',
                    Stage: "DevDeployStage1",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service1Stack'],
                        }
                    }
                },
                {
                    Name: 'DeployService2Stack',
                    Stage: "DevDeployStage2",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service2Stack'],
                        }
                    }
                },
                {
                    Name: 'DeployService3Stack',
                    Stage: "DevDeployStage3",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service3Stack'],
                        }
                    }
                }
            ]
        })
    }

    private createCase4Pipeline() {
        new pipeline.PipelineSimplePattern(this, 'case4', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Case4Pipeline',
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
                    Name: 'DeployService1Stack',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Order: 1,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service1Stack'],
                        }
                    }
                },
                {
                    Name: 'DeployService2Stack',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Order: 1,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service2Stack'],
                        }
                    }
                },
                {
                    Name: 'DeployService3Stack',
                    Stage: "DevDeployStage",
                    Kind: pipeline.ActionKind.BuildCodeBuild,
                    Enable: true,
                    Order: 1,
                    Detail: {
                        AppConfigFile: "config/app-config-sample2.json",
                        BuildDeployStacks: {
                            StackNameList: ['Sample2Service3Stack'],
                        }
                    }
                }
            ]
        })
    }
}
