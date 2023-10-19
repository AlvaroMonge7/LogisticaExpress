const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "invent_bd",
});

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  connection.query(
    "SELECT name FROM user WHERE name = ? AND password = ?",
    [name, password],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else if (results.length > 0) {
        const usuario = results[0];
        res.json({
          success: true,
          usuario: usuario.usuario,
        });
      } else {
        res.json({
          success: false,
          message: "Usuario o contraseña incorrectos",
        });
      }
    }
  );
});

//devuelve un json con los trabajadores registrados
app.get("/workers", (req, res) => {
  connection.query("SELECT name, email FROM user", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

//devuelve un json con los envíos registrados
app.get("/shipments", (req, res) => {
  connection.query(
    "SELECT id_shipment, postal_code, addressee, sender, weight FROM shipment",
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});


//se encarga de añadir un nuevo envío a la base de datos
app.post("/add_shipment", (req, res) => {
  const { postal_code, addressee, sender, weight } = req.body;

  connection.query(
    "INSERT INTO shipment (postal_code, addressee, sender, weight) VALUES (?, ?, ?, ?)",
    [postal_code, addressee, sender, weight],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: true });
      }
    }
  );
});

//se encarga de borrar el registro de un envio en concreto
app.delete("/delete_shipment/:id_shipment", (req, res) => {
  const { id_shipment } = req.params;

  connection.query(
    "DELETE FROM shipment WHERE id_shipment=?",
    [id_shipment],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: true });
      }
    }
  );
});

//devuelve un json con las compañías registradas
app.get("/companies", (req, res) => {
  connection.query("SELECT * FROM company", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

//devuelve un json con la informacion de la compañía especificada
app.get("/company/:id_company", (req, res) => {
  const { id_company } = req.params;

  connection.query(
    "SELECT * FROM company WHERE id_company=?",
    [id_company],
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});



//se encarga de añadir una compañía nueva a la base de datos
app.post("/add_companie", (req, res) => {
  const { name, postal_code } = req.body;

  connection.query(
    "INSERT INTO company (name, postal_code) VALUES (?, ?)",
    [name, postal_code],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: true });
      }
    }
  );
});



//se encarga de borrar la compañía especificada
app.delete("/delete_company/:id_company", (req, res) => {
  const { id_company } = req.params;

  connection.query(
    "DELETE FROM company WHERE id_company=?",
    [id_company],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: true });
      }
    }
  );
});


//se encarga de comprobar si los numeros de código postal están duplicados
function checkDuplicatePostalCodes(newPostalCodeArray, allPostalCodeBdArray) {
  return newPostalCodeArray.some((code) =>
    allPostalCodeBdArray.some((existingCodeArray) =>
      existingCodeArray.includes(code)
    )
  );
}

//se encarga de comprobar si el nombre de la empresa ya existe
function checkDuplicateCompanyName(connection, name, callback) {
  connection.query(
    "SELECT name FROM company WHERE name = ?",
    [name],
    (error, nombreResults) => {
      if (error) {
        console.error(
          "Error al verificar el nombre de la empresa: " + error.message
        );
        callback(error, true);
      } else if (nombreResults.length > 0) {
        callback(null, true); // El nombre de la empresa ya existe
      } else {
        callback(null, false); // El nombre de la empresa no existe
      }
    }
  );
}


//se encarga de añadir una empresa nueva
app.post("/add_company", (req, res) => {
  const { name, postal_code } = req.body;

  //convierte postal_code a un array
  const newPostalCodeArray = postal_code.split(",").map((code) => code.trim());

  //consulta para obtener los postal_code de todas las compañías registradas en la base de datos
  connection.query("SELECT postal_code FROM company", (error, results) => {
    if (error) {
      console.error("Error al consultar la base de datos: " + error.message);
      res.status(500).json({ success: false, error: error.message });
    } else {
      //crea un array con los postal_code de todas las compañias que hay registradas en lña base de datos 
      const allPostalCodeBdArray = results.map((result) =>
        result.postal_code.split(",").map((code) => code.trim())
      );

      const isDuplicatePostalCode = checkDuplicatePostalCodes(
        newPostalCodeArray,
        allPostalCodeBdArray
      );

      if (isDuplicatePostalCode) {
        res.json({
          success: false,
          message:
            "Los números de los códigos postales ya pertenecen a otra empresa",
        });
      } else {
        //comprueba si el nombre de la empresa ya existe
        checkDuplicateCompanyName(
          connection,
          name,
          (error, isDuplicateName) => {
            if (error) {
              res.status(500).json({ success: false, error: error.message });
            } else if (isDuplicateName) {
              //el nombre de la empresa ya existe
              res.json({
                success: false,
                message:
                  "Introduce un nombre de empresa que no esté registrado",
              });
            } else {
              //no se encontraron postal_code duplicados y el nombre no existe, añade la nueva compañía
              const newCompany = { name, postal_code };
              connection.query(
                "INSERT INTO company SET ?",
                newCompany,
                (error, results) => {
                  if (error) {
                    console.error(
                      "Error al agregar la nueva compañía: " + error.message
                    );
                    res
                      .status(500)
                      .json({ success: false, error: error.message });
                  } else {
                    res.json({
                      success: true,
                      message: "Compañía agregada con éxito",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

//se encarga de modificar la compañia especficada
app.put("/modify_company/:id_company", (req, res) => {
  const companyId = req.params.id_company;
  const { name, postal_code } = req.body;

  //convierte postal_code a un array
  const modifiedPostalCodeArray = postal_code
    .split(",")
    .map((code) => code.trim());

  //consulta para obtener los postal_code de todas las compañías registradas en la base de datos
  connection.query(
    "SELECT postal_code FROM company WHERE id_company != ?",
    [companyId],
    (error, results) => {
      if (error) {
        console.error("Error al consultar la base de datos: " + error.message);
        res.status(500).json({ success: false, error: error.message });
      } else {
        //crea un array con los postal_code de todas las compañias que hay registradas en lña base de datos
        const allPostalCodeBdArray = results.map((result) =>
          result.postal_code.split(",").map((code) => code.trim())
        );

        const isDuplicatePostalCode = checkDuplicatePostalCodes(
          modifiedPostalCodeArray,
          allPostalCodeBdArray
        );

        if (isDuplicatePostalCode) {
          res.json({
            success: false,
            message:
              "Los números de los códigos postales ya pertenecen a otra empresa",
          });
        } else {
          //comprobar si el nombre de la empresa ya existe (excepto la empresa que se está modificando)
          checkDuplicateCompanyName(
            connection,
            name,
            (error, isDuplicateName) => {
              if (error) {
                res.status(500).json({ success: false, error: error.message });
              } else if (isDuplicateName) {
                //el nombre de la empresa ya existe (excepto la empresa que se está modificando)
                connection.query(
                  "SELECT id_company FROM company WHERE name = ? AND id_company != ?",
                  [name, companyId],
                  (error, idResults) => {
                    if (error) {
                      console.error(
                        "Error al verificar el nombre de la empresa: " +
                          error.message
                      );
                      res
                        .status(500)
                        .json({ success: false, error: error.message });
                    } else if (idResults.length > 0) {
                      res.json({
                        success: false,
                        message:
                          "Introduce un nombre de empresa que no esté registrado",
                      });
                    } else {
                      //o se encontraron postal_code duplicados y el nombre no existe, modifica la compañía
                      const updatedCompany = { name, postal_code };
                      connection.query(
                        "UPDATE company SET ? WHERE id_company = ?",
                        [updatedCompany, companyId],
                        (error, results) => {
                          if (error) {
                            console.error(
                              "Error al modificar la compañía: " + error.message
                            );
                            res
                              .status(500)
                              .json({ success: false, error: error.message });
                          } else {
                            res.json({
                              success: true,
                              message: "Compañía modificada con éxito",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                //no se encontraron postal_code duplicados y el nombre no existe, modifica la compañía
                const updatedCompany = { name, postal_code };
                connection.query(
                  "UPDATE company SET ? WHERE id_company = ?",
                  [updatedCompany, companyId],
                  (error, results) => {
                    if (error) {
                      console.error(
                        "Error al modificar la compañía: " + error.message
                      );
                      res
                        .status(500)
                        .json({ success: false, error: error.message });
                    } else {
                      res.json({
                        success: true,
                        message: "Compañía modificada con éxito",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

//se encarga de devolver el nombre de la empresa que coincide postal_code
app.get("/get_company_by_postal_code/:postal_code", (req, res) => {
  const postalCode = req.params.postal_code;

  connection.query("SELECT name FROM company WHERE FIND_IN_SET(?, postal_code) > 0", [postalCode], (error, results) => {
    if (error) {
      console.error("Error al consultar la base de datos: " + error.message);
      res.status(500).json({ success: false, error: error.message });
    } else {
      if (results.length > 0) {
        res.json({
          success: true,
          company: results[0].name,
        });
      } else {
        //al no encontrase ninguna empresa con postal_code, se establece "INVENT"
        res.json({
          success: true,
          company: "INVENT",
        });
      }
    }
  });
});


app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
