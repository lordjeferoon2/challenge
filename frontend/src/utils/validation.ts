import * as yup from "yup";

export const registerSchema = yup.object({
  full_name: yup.string().required("El nombre completo es obligatorio"),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string()
    .required("La contraseña es obligatoria")
    .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, "La contraseña debe tener mínimo 8 caracteres, al menos 1 mayúscula y 1 número"),
  phone: yup.string().matches(/^\+?[0-9\s\-]{7,15}$/, "Teléfono inválido")
}).required();


export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});