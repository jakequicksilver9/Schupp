const AccessControl = require("accesscontrol")
const ac = new AccessControl()
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("admin")
 .extend("basic")
 .readAny("profile")
 
ac.grant("superuser")
 .extend("basic")
 .extend("admin")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac
})()