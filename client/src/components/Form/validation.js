const validation = (formData) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    temperament,
  } = formData;
  const errors = {};

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.name =
      "El nombre no puede contener números ni caracteres especiales";
  }

  if (name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 letras";
  }

  if (heightMin <= 0) {
    errors.heightMin = "La altura mínima debe ser mayor a 0";
  }

  if (heightMax <= 0) {
    errors.heightMax = "La altura máxima debe ser mayor a 0";
  }

  if (heightMin >= heightMax) {
    errors.heightMax = "La altura máxima debe ser mayor que la altura mínima";
  }

  if (weightMin <= 0) {
    errors.weightMin = "El peso mínimo debe ser mayor a 0";
  }

  if (weightMax <= 0) {
    errors.weightMax = "El peso máximo debe ser mayor a 0";
  }
  if (weightMin >= weightMax) {
    errors.weightMax = "El peso máximo debe ser mayor que el peso mínimo";
  }

  if (life_span <= 0 || life_span >= 60) {
    errors.life_span =
      "Los años de vida deben ser mayores que 0 y menores que 60";
  }

  if (temperament.length === 0) {
    errors.temperament = "Debe seleccionar al menos un temperamento";
  }

  return errors;
};

export default validation;
