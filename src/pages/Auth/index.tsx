import { api } from "../../api.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import clsx from "clsx";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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

  const handleCreate = async () => {
    try {
      api
        .post("/users/", {
          email,
          password,
        })
        .then(async () => {
          const response = await api.post("/token/", {
            email,
            password,
          });
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          navigate("/");
        });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center border-amber-700 border p-4 rounded max-w-max m-auto my-4",
        { "!border-red-700 !border-4": Boolean(error) },
      )}
    >
      <h2 className="m-3">Вход</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[100px_200px] gap-4"
      >
        <label>Email:</label>
        <input
          className="border-amber-700 border-2 rounded py-1 px-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Пароль:</label>{" "}
        <input
          className="border-amber-700 border-2 rounded py-1 px-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Войти</Button>
        <Button variant="secondary" type="button" onClick={handleCreate}>
          Регистрация
        </Button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default Auth;
