import { useState } from "react";

import Button from "components/Button";
import Spinner from "components/Spinner";

import { useResetUserPasswordMutation } from "services/storeApi";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secondNewPassword, setSecondNewPassword] = useState("");
  const [validation, setValidation] = useState("");

  const [resetUserPassword, { isLoading, isSuccess, isError, error }] =
    useResetUserPasswordMutation({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Простая валидация
    if (!password || !newPassword || !secondNewPassword) {
      setValidation("Заполните все поля");
      return;
    }
    if (newPassword !== secondNewPassword) {
      setValidation("Пароли не совпадают");
      return;
    }

    if (newPassword === password) {
      setValidation("Новый пароль совпадает с текущим");
      return;
    }

    // Очистка ошибки
    setValidation("");

    resetUserPassword({ new_password: newPassword, last_password: password });
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
          <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Смена пароля</h2>

          <p className="mb-4 text-center text-green-800">Вы успешно сменили пароль</p>

          <Button to="/" className="w-full">
            Главная
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-[calc(100vh-391px)] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Смена пароля</h2>

        {validation && <p className="mb-4 text-center text-red-500">{validation}</p>}
        {isError && <p className="mb-4 text-center text-red-500">Неверный пароль</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Текущий пароль
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
              Новый пароль
            </label>
            <input
              data-error={Boolean(error || isError)}
              type="password"
              id="second_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 data-[error=true]:border-red-700 data-[error=true]:ring-red-500"
              placeholder="Введите пароль повторно"
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
              value={secondNewPassword}
              onChange={(e) => setSecondNewPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 data-[error=true]:border-red-700 data-[error=true]:ring-red-500"
              placeholder="Введите пароль повторно"
            />
          </div>

          <div>
            <Button type="submit" className="mb-4 w-full">
              Сменить пароль
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
