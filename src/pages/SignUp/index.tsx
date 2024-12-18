import { useState } from "react";

import Button from "components/Button";
import Spinner from "components/Spinner";

import { useRegisterUserMutation } from "services/storeApi";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [validation, setValidation] = useState("");

  const [registerUser, { isLoading, isSuccess, isError, data, error }] = useRegisterUserMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!secondPassword || !password || !email) {
      setValidation("Заполните все поля");
      return;
    }

    if (secondPassword !== password) {
      setValidation("Пароли не совпадают");
      return;
    }

    // Очистка ошибки
    setValidation("");

    registerUser({
      email,
      password,
    });
  };

  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-391px)] items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );

  if (isSuccess)
    return (
      <div className="flex min-h-[calc(100vh-391px)] items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Вход в систему</h2>

          <p className="mb-4 text-center text-green-800">{data?.message}</p>

          <Button to="/profile-activate" className="w-full">
            Ввести код из почты
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-[calc(100vh-391px)] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Вход в систему</h2>

        {validation && <p className="mb-4 text-center text-red-500">{validation}</p>}
        {isError && (
          <p className="mb-4 text-center text-red-500">
            Пользователь с таким email уже зарегистрирован
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              data-error={Boolean(error || isError)}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 data-[error=true]:border-red-700 data-[error=true]:ring-red-500"
              placeholder="Введите email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              data-error={Boolean(error || isError)}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 data-[error=true]:border-red-700 data-[error=true]:ring-red-500"
              placeholder="Введите пароль"
            />
          </div>

          <div>
            <label htmlFor="second_password" className="block text-sm font-medium text-gray-700">
              Подтвердите пароль
            </label>
            <input
              data-error={Boolean(error || isError)}
              type="password"
              id="second_password"
              value={secondPassword}
              onChange={(e) => setSecondPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 data-[error=true]:border-red-700 data-[error=true]:ring-red-500"
              placeholder="Введите пароль повторно"
            />
          </div>

          <div>
            <Button type="submit" className="mb-4 w-full">
              Регистрация
            </Button>

            <p className="mb-0">Уже зарегистрированны?</p>
            <Button to="/sign-in" className="w-full">
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
