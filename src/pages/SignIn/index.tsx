import { api } from "services/api.tsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "components/Button";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Простая валидация
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    // Очистка ошибки
    setError("");

    try {
      const response = await api.post("/token/", {
        email,
        password,
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
          Вход в систему
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Введите пароль"
            />
          </div>

          <div>
            <Button type="submit" className="w-full mb-4">
              Войти
            </Button>

            <p className="mb-0">Нет аккаунта</p>
            <Button to="/sign-up" className="w-full mb-2">
              Регистрация
            </Button>

            <Link to="/reset-password" className="w-full">
              Забыли пароль
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
