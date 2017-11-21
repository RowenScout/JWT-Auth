'use strict';
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

{

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 100; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
      
    
    const time = new Date().getTime();
    const string = makeid();
    const combined = time + string;
    process.env.JWT_SECRET = bcrypt.hashSync(combined, 10);
}