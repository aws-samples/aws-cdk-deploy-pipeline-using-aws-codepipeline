#!/usr/bin/env node
import { AppContext, AppContextError } from '../lib/template/app-context';

import { Approach1PipelineStack } from './stack/sample1/approach1-pipeline-stack'
import { Approach2PipelineStack } from './stack/sample1/approach2-pipeline-stack'
import { Approach3PipelineStack } from './stack/sample1/approach3-pipeline-stack'
import { Sample1ServiceStack } from './stack/sample1/sample1-service-stack'

import { Sample2ServiceStack } from './stack/sample2/sample2-service-stack'
import { Sample2PipelineStack } from './stack/sample2/sample2-pipeline-stack'

import { Sample3MultipleTargetStack } from './stack/sample3/sample3-multiple-target-stack'
import { Sample3ServiceStack } from './stack/sample3/sample3-service-stack'


try {
    const appContext = new AppContext({
        appConfigFileKey: 'APP_CONFIG',
    });

    // Sample1
    if (appContext.appConfig.Stack.Approach1Pipeline) {
        new Approach1PipelineStack(appContext, appContext.appConfig.Stack.Approach1Pipeline);
    }
    if (appContext.appConfig.Stack.Approach2Pipeline) {
        new Approach2PipelineStack(appContext, appContext.appConfig.Stack.Approach2Pipeline);
    }
    if (appContext.appConfig.Stack.Approach3Pipeline) {
        new Approach3PipelineStack(appContext, appContext.appConfig.Stack.Approach3Pipeline);
    }
    if (appContext.appConfig.Stack.Sample1Service1) {
        new Sample1ServiceStack(appContext, appContext.appConfig.Stack.Sample1Service1);
    }
    
    // Sample2
    if (appContext.appConfig.Stack.Sample2Service1) {
        new Sample2ServiceStack(appContext, appContext.appConfig.Stack.Sample2Service1);
    }
    if (appContext.appConfig.Stack.Sample2Service2) {
        new Sample2ServiceStack(appContext, appContext.appConfig.Stack.Sample2Service2);
    }
    if (appContext.appConfig.Stack.Sample2Service3) {
        new Sample2ServiceStack(appContext, appContext.appConfig.Stack.Sample2Service3);
    }
    if (appContext.appConfig.Stack.Sample2Pipeline) {
        new Sample2PipelineStack(appContext, appContext.appConfig.Stack.Sample2Pipeline);
    }

    // Sample3
    if (appContext.appConfig.Stack.Sample3Pipeline) {
        new Sample3MultipleTargetStack(appContext, appContext.appConfig.Stack.Sample3Pipeline);
    }
    if (appContext.appConfig.Stack.Sample3Service1) {
        new Sample3ServiceStack(appContext, appContext.appConfig.Stack.Sample3Service1);
    }

} catch (error) {
    if (error instanceof AppContextError) {
        console.error('[AppContextError]:', error.message);
    } else {
        console.error('[Error]: not-handled-error', error);
    }
}
