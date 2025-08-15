"use client";

import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { registerSchema } from "@/utils/validation";
import InputField from "@/components/InputField";
import api from "@/services/api";

interface RegisterForm {
  full_name: string;
  email: string;
  password: string;
  phone: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema) as any,
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/register", data);
      toast.current?.show({
        severity: "success",
        summary: "Registro exitoso",
        detail: "Usuario registrado correctamente",
        life: 3000,
      });
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.current?.show({
          severity: "warn",
          summary: "Email duplicado",
          detail: "El email ya está registrado",
          life: 3000,
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al registrar el usuario",
          life: 3000,
        });
      }
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-50 dark:bg-gray-900 mx-auto">
      {/* Toast */}
      <Toast ref={toast} />

      <div className="card p-5 lg:p-8 rounded-2xl shadow-xl surface-card w-full max-w-md w-12 md:w-6 xl:w-4">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-2">Registro de usuario</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-fluid">
            <Controller
              name="full_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputField
                  id="full_name"
                  label="Nombre completo"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.full_name?.message}
                  className="mb-4"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.email?.message}
                  className="mb-4"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputField
                  id="password"
                  label="Contraseña"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.password?.message}
                  className="mb-4"
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputField
                  id="phone"
                  label="Teléfono"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phone?.message}
                  className="mb-4"
                />
              )}
            />

            <Button
              label={isSubmitting ? "Registrando..." : "Registrarse"}
              type="submit"
              className="w-full mt-3 p-3"
              disabled={isSubmitting}
            />
          </div>
        </form>

        <div className="text-center mt-4">
          <p>
            ¿Ya tienes cuenta?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Inicia sesión
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
