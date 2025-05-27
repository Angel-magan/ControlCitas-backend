const express = require("express");
const {
  getHorarios,
  agregarHorario,
  eliminarHorario,
  getCitasMedico,
  cancelarCitaMedico,
  getDetalleCita,
  agregarInforme,
  getExpedientePaciente
} = require("../controllers/medicoController");

const router = express.Router();

// Horarios
router.get("/horarios", getHorarios);
router.post("/horarios", agregarHorario);
router.delete("/horarios/:id_horario_medico", eliminarHorario);

// Citas
router.get("/citas", getCitasMedico);
router.put("/cancelarCita/:idCita", cancelarCitaMedico);
router.get("/detalleCita/:id_cita", getDetalleCita);
router.post("/informe/:id_cita", agregarInforme);

// Expediente
router.get("/expediente", getExpedientePaciente);

module.exports = router;