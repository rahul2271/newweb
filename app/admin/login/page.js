// ✅ Login Page: /app/admin/login/page.js
"use client";
import { useState } from "react";
import { auth } from "../../../firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="p-8 bg-white rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-600">RC Tech Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-2 border rounded"
        />
        <button onClick={handleLogin} className="w-full mt-4 p-2 bg-purple-600 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
}
