import { useState, useEffect, useCallback } from "react";

import Button from "components/Button";

import { api } from "services/api.tsx";

const AccountActivation = () => {
  const token = location.search?.replace("?", "");

  const [activationCode, setActivationCode] = useState("");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const activateAccount = useCallback(
    async (token: string) => {
      try {
        const response = await api.get(`users/activate?activation_code=${token}`);

        const data = await response;

        if (data.status === 200) {
          setStatus("success");
        } else {
          throw new Error(data?.data?.message);
        }
      } catch (error: any) {
        setStatus("error");
        setErrorMessage(error?.response?.data?.error ?? error.message);
      }
    },
    [setStatus, setErrorMessage],
  );

  useEffect(() => {
    token && activateAccount(token);
  }, [token, activateAccount]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        {!token && (
          <>
            <p className="mb-4 text-gray-700">Введите код активации, отправленный вам на почту.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                activateAccount(activationCode);
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

        {status === "loading" && <p className="text-gray-700">Активируем ваш аккаунт...</p>}
        {status === "success" && (
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
        {status === "error" && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-red-600">Ошибка активации</h2>
            <p className="mb-6 text-gray-700">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountActivation;
