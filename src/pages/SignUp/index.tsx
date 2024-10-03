import { api } from "../../api.tsx";
import { useState } from "react";
import Button from "../../components/Button";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!secondPassword || !password || !email) {
      setError("Заполните все поля");
      return;
    }

    if (secondPassword !== password) {
      setError("Пароли не совпадают");
      return;
    }

    // Очистка ошибки
    setError("");

    try {
      api
        .post("/users/", {
          email,
          password,
        })
        .then(({ data }) => {
          setSuccess(data?.message ?? "Успешно");
        });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  if (Boolean(success))
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-391px)] bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mt-0 font-bold mb-6 text-center text-gray-700">
            Вход в систему
          </h2>

          <p className="text-red-500 text-center mb-4">{success}</p>

          <Button to="/profile-activate" className="w-full">
            Ввести код из почты
          </Button>
        </div>
      </div>
    );

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
              data-error={Boolean(error)}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="data-[error=true]:border-red-700 data-[error=true]:ring-red-500 w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
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
              data-error={Boolean(error)}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="data-[error=true]:border-red-700 data-[error=true]:ring-red-500 w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Введите пароль"
            />
          </div>

          <div>
            <label
              htmlFor="second_password"
              className="block text-sm font-medium text-gray-700"
            >
              Подтвердите пароль
            </label>
            <input
              data-error={Boolean(error)}
              type="password"
              id="second_password"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
              className="data-[error=true]:border-red-700 data-[error=true]:ring-red-500 w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              placeholder="Введите пароль повторно"
            />
          </div>

          <div>
            <Button type="submit" className="w-full mb-4">
              Регистрация
            </Button>

            <p className="mb-0">Уже зарегистрированны?</p>
            <Button to="/sign-up" className="w-full">
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
