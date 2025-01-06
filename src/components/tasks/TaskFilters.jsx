import React, { useState, useRef, useEffect } from "react";
import Button from "../common/Button";
import request from "@/utils/request";
import useToken from "@/hooks/useToken";

const TaskFilters = ({ onFilterChange }) => {
  const initialForm = {
    state: "",
    dateLimit: "",
    assignedTo: "",
  };

  const [form, setForm] = useState(initialForm);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userResults, setUserResults] = useState({});
  const filterRef = useRef(null);
  const { getToken } = useToken();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onFilterChange(updatedForm);
  };

  const handleUserSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      setUserResults({});
      const updatedForm = { ...form, assignedTo: "" };
      setForm(updatedForm);
      onFilterChange(updatedForm);
      return;
    }
    const res = await request("users/username/" + value, getToken());
    setUserResults(res || {});
  };

  const selectUser = () => {
    const updatedForm = { ...form, assignedTo: userResults.id };
    setForm(updatedForm);
    onFilterChange(updatedForm);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        text="Filtrar Tareas"
        onClick={() => setIsOpen((prev) => !prev)}
        classExtra="mt-8"
      />
      {isOpen && (
        <div
          ref={filterRef}
          className="absolute top-12 left-0 w-[250px] p-4 bg-white rounded-lg shadow-md z-50"
        >
          <h2 className="text-lg font-semibold mb-4">Filtros de Tareas</h2>

          <div className="mb-4">
            <label htmlFor="state" className="block font-medium mb-2">
              Estado:
            </label>
            <select
              id="state"
              name="state"
              value={form.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="TODO">Por Hacer</option>
              <option value="INPROGRESS">En Progreso</option>
              <option value="FINISHED">Completado</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dateLimit" className="block font-medium mb-2">
              Fecha Límite:
            </label>
            <input
              type="date"
              id="dateLimit"
              name="dateLimit"
              value={form.dateLimit}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="searchUser" className="block font-medium mb-2">
              Asignado a:
            </label>
            <input
              type="text"
              id="searchUser"
              name="search"
              value={search}
              onChange={handleUserSearch}
              placeholder="Buscar usuario..."
              className="w-full p-2 border rounded"
            />
            {userResults.username && (
              <div
                onClick={selectUser}
                className="hover:bg-[#ccc] hover:cursor-pointer border-2 p-2 rounded-lg flex items-center mt-3"
              >
                <div className="flex justify-center items-center text-white uppercase w-[32px] h-[32px] rounded-full bg-[#000]">
                  {userResults.username ? userResults.username[0] : "u"}
                </div>
                <span className="ml-3">{userResults.username}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
