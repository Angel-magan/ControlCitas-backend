const express = require("express");
const {
  getUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  getMedicos,
  crearMedico,
  editarMedico,
  eliminarMedico,
  getEspecialidades,
  crearEspecialidad,
  editarEspecialidad,
  eliminarEspecialidad,
  registrarMedico,
  cambiarEstadoMedico,
  getMedicoById
} = require("../controllers/adminController");

const router = express.Router();

// Usuarios
router.get("/usuarios", getUsuarios);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id_usuario", editarUsuario);
router.delete("/usuarios/:id_usuario", eliminarUsuario);

// Médicos
router.get("/medicos", getMedicos);
router.post("/medicos", crearMedico);
router.put("/medicos/:id_medico/estado", cambiarEstadoMedico);
router.get("/medicos/:id_medico", getMedicoById);
router.put("/medicos/:id_medico", editarMedico);
router.delete("/medicos/:id_medico", eliminarMedico);
router.post("/registrar-medico", registrarMedico);

// Especialidades
router.get("/especialidades", getEspecialidades);
router.post("/especialidades", crearEspecialidad);
router.put("/especialidades/:id_especialidad", editarEspecialidad);
router.delete("/especialidades/:id_especialidad", eliminarEspecialidad);

module.exports = router;