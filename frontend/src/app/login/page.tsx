"use client";

import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/utils/validation";
import InputField from "@/components/InputField";
import api from "@/services/api";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("token", res.data.access_token);
      router.push("/users");
    } catch (err: any) {
      console.error(err.response?.data?.detail || "Error de login");
      toast.current?.show({
        severity: "error",
        summary: "Error de login",
        detail: "Por favor, verifica tus credenciales",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-50 dark:bg-gray-900 mx-auto">
      {/* Toast */}
      <Toast ref={toast} />

      <div className="card p-5 lg:p-8 rounded-2xl shadow-xl surface-card w-12 md:w-6 xl:w-4">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-2">Bienvenido de nuevo</h1>
          <p className="text-600">Por favor, ingresa para continuar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-fluid">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputField
                  id="email"
                  label="Correo Electrónico"
                  type="email"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.email?.message}
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
                />
              )}
            />
            <Button label="Ingresar" type="submit" className="w-full mt-4 p-3" />
            <Button
              label="Registrar"
              type="button"
              className="w-full mt-2 p-button-outlined p-3"
              onClick={() => router.push("/register")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
