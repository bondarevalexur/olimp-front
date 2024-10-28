import { useState } from "react";
import { useRouteError } from "react-router-dom";

import Button from "components/Button";

function NotFoundPage() {
  let error: any = useRouteError();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(error.stack).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Сбрасываем состояние через 2 секунды
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">505</h1>
        <p className="mb-8 text-2xl font-medium text-gray-600">
          Ошибка сервера. Что-то пошло не так.
          <br />
          Отправьте пожалуйста текст ошибки почту{" "}
          <a className="text-lime-600" href="mailto:support@gmail.com">
            support@gmail.com
          </a>
        </p>

        <div className="mb-8">
          <textarea
            readOnly
            value={error.stack as any}
            className="h-40 w-full rounded-lg border-2 border-gray-300 p-4 text-sm text-gray-700 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Текст ошибки..."
          />
        </div>

        <Button
          onClick={handleCopy}
          href={copied ? "mailto:test@mail.ru" : undefined}
          className="mr-4"
        >
          {copied ? "Нажмите для отправки" : "Скопировать ошибку"}
        </Button>

        <Button href="/">Вернуться на главную</Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
