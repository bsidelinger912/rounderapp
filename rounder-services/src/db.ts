import { DynamoDB } from 'aws-sdk';

const { IS_OFFLINE } = process.env;

const dynamoDb = IS_OFFLINE === 'true'
  ? new DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  })
  : new DynamoDB.DocumentClient();

export default dynamoDb;
