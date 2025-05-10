const express = require("express"); //Crear el server para dar rutas

const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router(); // Crear un enrutador y para definir las rutas

// Rutas de usuario
router.post("/registrarUsuario", registerUser); //Registrar usuario
router.post("/iniciarSesion", loginUser); //Iniciar sesión
module.exports = router;
