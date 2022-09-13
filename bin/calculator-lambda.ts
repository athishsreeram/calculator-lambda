#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CalculatorLambdaStack } from '../lib/calculator-lambda-stack';

const app = new cdk.App();
new CalculatorLambdaStack(app, 'CalculatorLambdaStack', {
  stackName: 'cdk-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});