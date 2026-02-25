import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    try {
      await login({ email, password });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <h2>Login Page</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="yours@mail.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*****"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
