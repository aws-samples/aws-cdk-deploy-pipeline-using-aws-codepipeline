import * as iam from '@aws-cdk/aws-iam';

import * as base from '../../../lib/template/stack/devops/pipeline-base-stack';
import { AppContext } from '../../../lib/template/app-context';
import { Override } from '../../../lib/template/stack/base/base-stack';

import * as pipeline from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample3RoleCustomizing2Stack extends base.PipelineBaseStack {
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
            
        ];
    }

    @Override
    protected onBuildPolicies(): iam.PolicyStatement[] | undefined {
        const statement = new iam.PolicyStatement();
        statement.addActions(
            "cognito:*",
            "dynamodb:*",
            "application-autoscaling:*",
            "elasticloadbalancingv2:*",
            "elasticloadbalancing:*",
        );
        statement.addResources("*");

        return [statement];
    }
}
