# Testing JWT-Auth

"npm run db" to make mongoose run.

If mongoose is throwing errors, run "pgrep mongod", and then kill <id> that it gives you. This can show hidden mongoose connections that are screwing with things.
  
"npm start" to run local testing server.

http GET localhost:3000/signin -a username:password

http GET localhost:3000/signup -a username:password

http GET localhost:3000/update -a username:oldPassword:newPassword

http --auth-type=jwt --auth="<Paste token here>" localhost:3000/logout -h

