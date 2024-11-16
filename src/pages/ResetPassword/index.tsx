import { useState } from "react";

import Button from "components/Button";
import Spinner from "components/Spinner";

import { useResetUserPasswordMutation } from "services/storeApi";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState("");

  const [resetUserPassword, { isLoading, isSuccess, isError, data, error }] =
    useResetUserPasswordMutation({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Простая валидация
    if (!email) {
      setValidation("Заполните все поля");
      return;
    }

    // Очистка ошибки
    setValidation("");

    resetUserPassword({ email });
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
          <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Сброс пароля</h2>

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
        <h2 className="mb-6 mt-0 text-center text-2xl font-bold text-gray-700">Сброс пароля</h2>

        {isError && <p className="mb-4 text-center text-red-500">{(error as any)?.data?.error}</p>}
        {validation && <p className="mb-4 text-center text-red-500">{validation}</p>}

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
