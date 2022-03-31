import * as base from '../../../lib/template/stack/base/base-stack';
import { AppContext } from '../../../lib/template/app-context';

import * as cicd from '../../../lib/template/construct/pattern/pipeline-simple-pattern';


export class Sample3CodePipelineCustomizing1Stack extends base.BaseStack {

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);

        const pipeline = new cicd.PipelineSimplePattern(this, 'Approach1', {
            projectPrefix: this.projectPrefix,
            stackConfig: this.stackConfig,
            stackName: this.stackName,
            env: this.commonProps.env!,
            pipelineName: 'Approach1Pipeline',
            actionFlow: [
            ]
        })

        const codePipeline = pipeline.codePipeline;
        codePipeline.addStage(.....);
    }
}
