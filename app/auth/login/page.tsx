"use client";

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/store/slices/counterSlice";
import type { RootState } from "@/store";

export default function LoginPage() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800  text-center">
          SmartProject FooTalentGroup
        </h1>
        <br />
        <p className="text-center mb-1">Inicialización de projecto oficial</p>
        <h2 className="text-md text-gray-500 mb-6 text-center">
          Grupo 2 - Muestra de Redux Toolkit
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-700">
            Contador actual:{" "}
            <span className="font-semibold text-indigo-600">{count}</span>
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => dispatch(increment())}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-white font-medium transition hover:bg-indigo-700 active:scale-95"
            >
              +1
            </button>
            <button
              onClick={() => dispatch(decrement())}
              className="rounded-lg bg-red-500 px-5 py-2 text-white font-medium transition hover:bg-red-600 active:scale-95"
            >
              -1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
