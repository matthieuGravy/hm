import { useEffect, useState, useMemo } from "react";
import { useStore, registerSchema } from "@/store/store";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
} from "@/components/ui";
import { loadJsonData } from "@/utils/loadjsondata";
import { ErrorComponent } from "@/components/common";
import { RegistrationFormSkeleton } from "@/components/authentication";
import { registerUser } from "@/api/auth";
// type from Zod schema
type RegisterData = z.infer<typeof registerSchema>;

// Define the type for the loaded JSON data
interface RegisterUIData {
  cardTitle: string;
  cardDescription: string;
  labelName: string;
  labelEmail: string;
  labelPassword: string;
  buttonIsSubmitting: string;
  buttonSubmit: string;
  cardFooter: string;
  cardFooterLink: string;
}

interface RegistrationFormProps {
  onSwitchToLogin: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSwitchToLogin,
}) => {
  const setRegister = useStore((state) => state.setRegister);
  const [registerData, setRegisterData] = useState<RegisterUIData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadJsonData("register.json");
        setRegisterData(data.register as RegisterUIData);
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

  const initialValues = useMemo<RegisterData>(
    () => ({
      name: "",
      email: "",
      password: "",
    }),
    []
  );

  const validationSchema = useMemo(
    () => toFormikValidationSchema(registerSchema),
    []
  );

  const memoizedRegisterData = useMemo(() => registerData, [registerData]);

  if (isLoading) return <RegistrationFormSkeleton />;
  if (error) return <ErrorComponent message={error} />;
  if (!memoizedRegisterData) return null;

  const handleSubmit = async (
    values: RegisterData,
    { setSubmitting, setErrors }: FormikHelpers<RegisterData>
  ) => {
    try {
      const result = await registerUser(values);
      setRegister(result);
      console.log("Inscription réussie:", result);
      // Redirect to ??
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ email: error.message });
      }
      console.error("Erreur d'inscription:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{memoizedRegisterData.cardTitle}</CardTitle>
        <CardDescription>
          {memoizedRegisterData.cardDescription}
        </CardDescription>
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
                <Label htmlFor="name">{memoizedRegisterData.labelName}</Label>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <Input id="name" placeholder="John Doe" {...field} />
                  )}
                </Field>
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{memoizedRegisterData.labelEmail}</Label>
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
                  {memoizedRegisterData.labelPassword}
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
                  ? memoizedRegisterData.buttonIsSubmitting
                  : memoizedRegisterData.buttonSubmit}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          {memoizedRegisterData.cardFooter}{" "}
          <a
            href="#"
            className="text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
          >
            {memoizedRegisterData.cardFooterLink}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
