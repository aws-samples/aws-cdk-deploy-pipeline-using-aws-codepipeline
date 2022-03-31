import * as iam from 'aws-cdk-lib/aws-iam';

import * as base from '../../../lib/template/stack/base/base-stack';
import { AppContext } from '../../../lib/template/app-context';

import * as cicd from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample3RoleCustomizing1Stack extends base.BaseStack {

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);

        const pipeline = new cicd.PipelineSimplePattern(this, 'Approach1', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Approach1Pipeline',
            actionFlow: [
            ],
            buildPolicies: this.createCustomPolicies()
        });
    }

    private createCustomPolicies(): iam.PolicyStatement[] {
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
