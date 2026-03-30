import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { toast } from "sonner";

import { loginSchema } from "@/validations/auth.validation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: toFormikValidate(loginSchema),
    onSubmit: async (values) => {
      try {
        const result = await login(values);
        console.log(result);

        toast.info("Login success");
      } catch (error) {
        console.error(error);
        toast.error("Login error", { position: "top-center" });
      }
    },
  });

  return (
    <main>
      <Card>
        <CardHeader>
          <h2>Login Page</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="yours@mail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {<p className="text-red-500 text-xs">{formik.errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*****"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {<p className="text-red-500 text-xs">{formik.errors.password}</p>}
            </div>

            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
