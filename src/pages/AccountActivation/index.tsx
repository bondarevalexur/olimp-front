import { useState, useEffect } from "react";

import Button from "components/Button";

import { useActivateUserMutation } from "services/storeApi";

const AccountActivation = () => {
  const token = location.search?.replace("?", "");

  const [activationCode, setActivationCode] = useState("");

  const [activateUser, { isLoading, isSuccess, isError, data }] = useActivateUserMutation({});

  useEffect(() => {
    token && activateUser(token);
  }, [token]);

  return (
    <div className="flex min-h-[calc(100vh-391px)] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        {!token && (
          <>
            <p className="mb-4 text-gray-700">Введите код активации, отправленный вам на почту.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                activateUser(activationCode);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Введите код активации"
                required
              />
              <Button type="submit" className="w-full">
                Отправить код
              </Button>
            </form>
          </>
        )}

        {isLoading && <p className="text-gray-700">Активируем ваш аккаунт...</p>}
        {isSuccess && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-orange-400">Аккаунт активирован!</h2>
            <p className="mb-6 text-gray-700">
              Ваш аккаунт был успешно активирован. Вы можете теперь войти в систему.
            </p>
            <Button to="/sign-in" className="w-full">
              Перейти на страницу входа
            </Button>
          </>
        )}
        {isError && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-red-600">Ошибка активации</h2>
            <p className="mb-6 text-gray-700">{data?.message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountActivation;
