"use client";

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        alert("No autorizado");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

const headerTemplate = (
  <div className="flex justify-between items-center w-full p-4">
    <Button
      icon="pi pi-sign-out"
      className="p-button-primary p-button-lg p-2"
      onClick={handleLogout}
    />
    <h1 className="text-3xl font-bold text-gray-800 ml-4 p-2">Usuarios Registrados</h1>
  </div>
);

  return (
    <div className="bg-gray-50 p-6 lg:p-8 min-h-screen">
      <Panel
        header={headerTemplate}
        className="shadow-2xl surface-card"
      >
        {loading ? (
          <div className="flex justify-center py-10">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration=".8s" />
          </div>
        ) : (
          <div className="card mt-6 p-4"> {/* mt-6 agrega separación entre título y tabla */}
            <DataTable
              value={users}
              responsiveLayout="scroll"
              paginator
              rows={10}
              emptyMessage="No hay usuarios registrados"
              stripedRows
              className="p-datatable-gridlines p-datatable-responsive-demo text-lg"
              tableStyle={{ minWidth: "50rem" }}
              rowClassName={() => "py-3"} // Padding vertical en cada fila
            >
              <Column field="full_name" header="Nombre" sortable />
              <Column field="email" header="Email" sortable />
              <Column field="phone" header="Teléfono" />
            </DataTable>
          </div>
        )}
      </Panel>
    </div>
  );
};

export default UsersPage;
