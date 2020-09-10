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
    `CREATE TABLE Users ( Username varchar(255) Unique, FirstName varchar(255), LastName varchar(255), Email varchar(255), Roles varchar(255), OrganizationId int );`,
    (err, res) => {
      console.log(err, res)
    }
  )

  connection.execSql(request)
}