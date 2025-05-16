import { useEffect, useState, useMemo } from "react";
import { useStore } from "@/store/store";
import { registerSchema } from "@/schemas/auth";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
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
import { FormLink } from "@/components/authentication/FormLink";
import {
  RegisterUIData,
  RegistrationFormContentProps,
} from "@/types/authentication";

// type from Zod schema
type RegisterData = z.infer<typeof registerSchema>;

const RegistrationFormContent: React.FC<RegistrationFormContentProps> = ({
  onSwitchToLogin,
}) => {
  const setRegister = useStore((state) => state.setRegister);
  const [registerData, setRegisterData] = useState<RegisterUIData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      username: "",
      email: "",
      password1: "",
      password2: "",
    }),
    []
  );

  const validationSchema = useMemo(
    () => toFormikValidationSchema(registerSchema),
    []
  );
  // [registerData] liste des variables qui doivent déclencher le recalcul de la valeur
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
      if (result) {
        setRegister(result);
        console.log("Inscription réussie:", result);
        navigate("/login");
      }
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
                <Label htmlFor="password1">
                  {memoizedRegisterData.labelPassword}
                </Label>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input id="password1" type="password" {...field} />
                  )}
                </Field>
                {errors.password1 && touched.password1 && (
                  <div className="text-red-500 text-sm">{errors.password1}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password2">
                  {memoizedRegisterData.labelConfirmPassword}
                </Label>
                <Field name="password2">
                  {({ field }: FieldProps) => (
                    <Input id="password2" type="password" {...field} />
                  )}
                </Field>
                {errors.password2 && touched.password2 && (
                  <div className="text-red-500 text-sm">{errors.password2}</div>
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
          <FormLink
            type="signupModal"
            text={memoizedRegisterData.cardFooterLink}
            onSwitchToLogin={onSwitchToLogin}
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegistrationFormContent;
