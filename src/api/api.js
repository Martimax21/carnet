


module.exports = function carnetAPI (conn) {
    return {
        createUser: function(user,callback){
            conn.query(
            'INSERT INTO User (username) VALUES (?)', [user],
            function(err, result) {
              if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                  callback(new Error('A user with this username already exists'));
                }
                else {
                  callback(err);
                }
              }
              else {

                conn.query(
                  'SELECT id, username FROM User WHERE id = ?', [result.insertId],
                  function(err, result) {
                    if (err) {
                      callback(err);
                    }
                    else {
                      callback(null, result[0]);
                    }
                  }
                );
              }
            }
          );
        }
    }
}
