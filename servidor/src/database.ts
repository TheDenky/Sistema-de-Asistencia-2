import mysql from 'promise-mysql';
import keys from './keys';

const poolDB = mysql.createPool(keys.database);

poolDB.getConnection().then((connection) => {
  poolDB.releaseConnection(connection);
  console.log('db conectada');
});
export default poolDB;
