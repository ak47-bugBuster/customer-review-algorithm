/*
 * Author: Akshaya Bhandare
 * Page: DB Connect
 * Created At: 14-Jun-2025 
*/
import cassandra from 'cassandra-driver';

// Connect to DB
export const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], // Update with Scylla host
  localDataCenter: 'aws-us-east-1',
  keyspace: 'customer-review',
});
