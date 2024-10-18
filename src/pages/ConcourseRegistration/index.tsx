import { useState } from "react";
import { useGetAlbumsQuery } from "../../services/store.ts";

function ConcourseRegistration() {
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");

  const {} = useGetAlbumsQuery();

  return (
    <>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
        placeholder="Введите email"
      />
      <input
        type="email"
        id="email"
        value={email1}
        onChange={(e) => setEmail1(e.target.value)}
        className="w-full mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
        placeholder="Введите email1"
      />
      <div className="grid gap-3 justify-items-start">
        <button
          onClick={() => {
            console.log(email);
          }}
        >
          next
        </button>
        <button
          onClick={() => {
            console.log({ email, email1 });
          }}
        >
          what
        </button>
        <button
          onClick={() => {
            console.log(email1);
          }}
        >
          go
        </button>
      </div>
    </>
  );
}

export default ConcourseRegistration;
