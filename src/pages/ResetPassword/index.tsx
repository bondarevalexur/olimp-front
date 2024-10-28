import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";

import { api } from "services/api.tsx";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Простая валидация
    if (!email) {
      setError("Заполните почту");
      return;
    }

    // Очистка ошибки
    setError("");

    try {
      const response = await api.post("/token/", {
        email,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-391px)] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Сброс пароля</h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Введите email"
            />
          </div>

          <div>
            <Button type="submit" className="mb-4 w-full">
              Сбросить пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
