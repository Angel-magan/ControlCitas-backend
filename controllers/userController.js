const db = require("../config/db");
const bcrypt = require("bcryptjs"); //Libreria para encriptar contraseñas

exports.registerUser = (req, res) => {
  const {
    nombres,
    apellidos,
    direccion,
    telefono,
    correo,
    contrasena,
    sexo,
    rol,
  } = req.body;

  if (
    !nombres ||
    !apellidos ||
    !direccion ||
    !telefono ||
    !correo ||
    !contrasena ||
    !sexo ||
    !rol
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!passwordRegex.test(contrasena)) {
    return res.status(400).json({
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
    });
  }

  // Verificar si el correo ya existe
  const checkEmailSql = "SELECT * FROM usuario WHERE correo = ?";
  db.query(checkEmailSql, [correo], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar el correo" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "El correo ya está registrado. Usa otro email." });
    }

    // Encriptar y registrar
    bcrypt.hash(contrasena, 10, (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al encriptar la contraseña" });
      }

      const insertSql =
        "INSERT INTO usuario (nombres, apellidos, direccion, telefono, correo, contrasena, sexo, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        insertSql,
        [nombres, apellidos, direccion, telefono, correo, hash, sexo, rol],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al registrar el usuario" });
          }

          res.status(201).json({ message: "Usuario registrado correctamente" });
        }
      );
    });
  });
};

exports.loginUser = (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Verificar si el correo existe
  const checkEmailSql = "SELECT * FROM usuario WHERE correo = ?";
  db.query(checkEmailSql, [correo], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar el correo" });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Comparar la contraseña
    const user = results[0];
    bcrypt.compare(contrasena, user.contrasena, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al comparar la contraseña" });
      }

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Correo o contraseña incorrectos" });
      }

      // Aquí puedes generar un token JWT si lo necesitas
      res.json({ message: "Inicio de sesión exitoso", user });
    });
  });
};
