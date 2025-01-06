import { useState } from "react";

export default function Input({ type = "text", value, name, onChange, label }) {
  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex-grow flex flex-col gap-3">
      {label && (
        <label className="font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            className="rounded-lg px-2 py-3 border-2 w-full h-32" // Añadimos h-32 para hacer el textarea más alto
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            className="rounded-lg px-2 py-3 border-2 w-full"
            id={name}
            name={name}
            type={type === "password" && !showPassword ? "password" : type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
          />
        )}
        
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <i
                className="pi pi-eye"
                style={{ fontSize: "1.5rem", color: "#ccc" }}
              ></i>
            ) : (
              <i
                className="pi pi-eye-slash"
                style={{ fontSize: "1.5rem", color: "#ccc" }}
              ></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
