npm run db to make mongoose run.
if mongoos is throwing errors, run "pgrep mongod", and then kill <id> that it gives you. this can show hidden mongoose connections that are screwing with things.

http GET localhost:3000/signin -a username:password
http GET localhost:3000/signup -a username:password

http get localhost:3000/update -a username:newpassword:oldpassword

http --auth-type=jwt --auth="<Paste token here>" localhost:3000/logout -h
