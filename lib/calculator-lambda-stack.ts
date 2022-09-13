import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class CalculatorLambdaStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'api', {
      description: 'example api gateway',
    });

    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, 'apiUrl', {value: api.url});

    const calculatorLambda = new lambda.Function(this, 'calculator', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'calculator.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../lambda')),
    });

    // 👇 add a /todos resource
    const todos = api.root.addResource('calculator');

    // 👇 integrate GET /todos with getTodosLambda
    todos.addMethod(
      'GET',
      new apigateway.LambdaIntegration(calculatorLambda, {proxy: true}),
    );

  }
}
