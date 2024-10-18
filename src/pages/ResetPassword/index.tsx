import { api } from "services/api.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";

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
    <div className="flex items-center justify-center min-h-[calc(100vh-391px)] bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mt-0 font-bold mb-6 text-center text-gray-700">
          Сброс пароля
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Введите email"
            />
          </div>

          <div>
            <Button type="submit" className="w-full mb-4">
              Сбросить пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
