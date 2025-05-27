const express = require("express");

const {
  getEspecialidades,
  getMedicosPorEspecialidad,
  getDisponibilidadMedico,
  agendarCita,
  getCitasPaciente,
  cancelarCita,
  getExpedientePaciente,
  getExpedientePorPaciente
} = require("../controllers/pacienteController");

const router = express.Router();

// Rutas de paciente
router.get("/listarEspecialidades", getEspecialidades);
router.get("/listarMedicos/:idEspecialidad", getMedicosPorEspecialidad);
router.get("/disponibilidadMedico/:idMedico", getDisponibilidadMedico);
router.post("/agendarCita", agendarCita);
router.get("/consultarCitas", getCitasPaciente);
router.put("/cancelarCita/:idCita", cancelarCita);

// Expediente (paciente ve su propio expediente)
router.get("/expediente", getExpedientePaciente);
// Expediente (médico ve expediente de cualquier paciente)
router.get("/expediente/:id_paciente", getExpedientePorPaciente);

module.exports = router;