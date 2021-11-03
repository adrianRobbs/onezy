firebase use <Projectname>

firebase functions:config:set killer.secret=1234shoalin

firebase deploy --only functions

firebase functions:config:get

# update

firebase functions:config:set killer.secret=1234shoalinz

# delete

firebase functions:config:unset killer.secret

# cloning from another project

firebase functions:config:clone --from <projectname>

## Usage

functions.config().killer.secret
