const { Connection, Request } = require("tedious")

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "crewDragon", 
      password: "Wq25YubpmFk4AxD" 
    },
    type: "default"
  },
  server: "schuppdev.database.windows.net", 
  options: {
    database: "develop", 
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message)
  } else {
    queryDatabase()
  }
});


function queryDatabase() {

  const request = new Request(
    createUsersTable,
    (err, res) => {
      console.log(err, res)
    }
  )

  connection.execSql(request)
}