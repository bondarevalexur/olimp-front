import { useState, useEffect, useCallback } from "react";
import { api } from "../../api.tsx";
import Button from "../../components/Button";

const AccountActivation = () => {
  const token = location.search?.replace("?", "");

  const [activationCode, setActivationCode] = useState("");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const activateAccount = useCallback(
    async (token: string) => {
      try {
        const response = await api.get(`activate?activation_code=${token}`);

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        {!token && (
          <>
            <p className="text-gray-700 mb-4">
              Введите код активации, отправленный вам на почту.
            </p>

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
                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                placeholder="Введите код активации"
                required
              />
              <Button type="submit" className="w-full">
                Отправить код
              </Button>
            </form>
          </>
        )}

        {status === "loading" && (
          <p className="text-gray-700">Активируем ваш аккаунт...</p>
        )}
        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Аккаунт активирован!
            </h2>
            <p className="text-gray-700 mb-6">
              Ваш аккаунт был успешно активирован. Вы можете теперь войти в
              систему.
            </p>
            <Button to="/sign-in" className="w-full">
              Перейти на страницу входа
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Ошибка активации
            </h2>
            <p className="text-gray-700 mb-6">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountActivation;
