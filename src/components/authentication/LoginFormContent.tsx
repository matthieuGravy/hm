import { useEffect, useState, useMemo } from "react";

import { useStore, loginSchema } from "@/store/store";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";
import { loadJsonData } from "@/utils/loadjsondata";
import { ErrorComponent } from "@/components/common";
import { LoginFormSkeleton } from "@/components/authentication";
import { loginUser } from "@/api/auth";
import { LoginUIData, LoginFormProps } from "@/types/authentication";

type LoginData = z.infer<typeof loginSchema>;

interface LoginFormContentProps {
  onSwitchToSignUp?: () => void;
}

const LoginFormContent: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  const setLogin = useStore((state) => state.setLogin);
  const [loginData, setLoginData] = useState<LoginUIData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadJsonData("login.json");
        setLoginData(data.login as LoginUIData);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const initialValues = useMemo<LoginData>(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const validationSchema = useMemo(
    () => toFormikValidationSchema(loginSchema),
    []
  );

  const memoizedLoginData = useMemo(() => loginData, [loginData]);

  if (isLoading) return <LoginFormSkeleton />;
  if (error) return <ErrorComponent message={error} />;
  if (!memoizedLoginData) return null;

  const handleSubmit = async (
    values: LoginData,
    { setSubmitting, setErrors }: FormikHelpers<LoginData>
  ) => {
    try {
      const result = await loginUser(values);
      setLogin(result);
      console.log("Connexion réussie:", result);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ email: error.message });
      }
      console.error("Erreur de connexion:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{memoizedLoginData.cardTitle}</CardTitle>
        <CardDescription>{memoizedLoginData.cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{memoizedLoginData.labelEmail}</Label>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {memoizedLoginData.labelPassword}
                </Label>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input id="password" type="password" {...field} />
                  )}
                </Field>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? memoizedLoginData.buttonIsSubmitting
                  : memoizedLoginData.buttonSubmit}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          {memoizedLoginData.cardFooter}{" "}
          <a
            href="#"
            className="text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToSignUp();
            }}
          >
            {memoizedLoginData.cardFooterLink}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginFormContent;
