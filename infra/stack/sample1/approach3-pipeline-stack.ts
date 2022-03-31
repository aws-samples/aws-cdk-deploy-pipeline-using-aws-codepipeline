import * as base from '../../../lib/template/stack/devops/pipeline-base-stack';
import { AppContext } from '../../../lib/template/app-context';
import { Override } from '../../../lib/template/stack/base/base-stack';

import * as cicd from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Approach3PipelineStack extends base.PipelineBaseStack {
    private pipeline: cicd.PipelineSimplePattern;

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);
    }

    @Override
    onPostConstructor(pipeline: cicd.PipelineSimplePattern): void {
        this.pipeline = pipeline;
    }

    @Override
    onPipelineName(): string {
        return this.stackConfig.PipelineName;
    }

    @Override
    onActionFlow(): cicd.ActionProps[] {
        return this.stackConfig.ActionFlow;
    }
}
