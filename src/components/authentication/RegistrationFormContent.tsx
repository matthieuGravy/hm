import { useMemo } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useTranslation } from "react-i18next";
import { registerSchema } from "@/schemas/auth";
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
import { registerUser } from "@/api/auth";
import { FormLink } from "@/components/authentication/FormLink";
import { RegistrationFormContentProps } from "@/types/authentication";

// type from Zod schema
type RegisterData = z.infer<typeof registerSchema>;

const RegistrationFormContent: React.FC<RegistrationFormContentProps> = ({
  onSwitchToLogin,
}) => {
  const { t } = useTranslation();
  const setRegister = useAuthStore((state) => state.setRegister);
  const setRegistrationSuccess = useAuthStore(
    (state) => state.setRegistrationSuccess
  );

  const initialValues = useMemo<RegisterData>(
    () => ({
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

  const handleSubmit = async (
    values: RegisterData,
    { setSubmitting, setErrors, setStatus }: FormikHelpers<RegisterData>
  ) => {
    try {
      console.log("1. Starting form submission");
      const result = await registerUser(values);
      console.log("2. Registration result:", result);

      if (result && result.success) {
        console.log("3. Registration successful");
        setRegister({
          email: values.email,
          password1: values.password1,
          password2: values.password2,
        });
        console.log("4. Register state updated");
        setRegistrationSuccess(true);
        console.log("5. Success state set to true");
        setStatus({ success: t("register.successMessage") });
      } else {
        console.log("3. Unexpected response format:", result);
        setStatus({ error: t("register.errorGeneral") });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      if (error instanceof Error) {
        setErrors({ email: error.message });
        setStatus({ error: t("register.errorGeneral") });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t("register.cardTitle")}</CardTitle>
        <CardDescription>{t("register.cardDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form className="space-y-4">
              {status && status.error && (
                <div className="text-red-500 text-sm">{status.error}</div>
              )}
              {status && status.success && (
                <div className="text-green-500 text-sm">{status.success}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t("register.labelEmail")}</Label>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("register.emailPlaceholder")}
                      {...field}
                    />
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password1">{t("register.labelPassword")}</Label>
                <Field name="password1">
                  {({ field }: FieldProps) => (
                    <Input
                      id="password1"
                      type="password"
                      placeholder={t("register.passwordPlaceholder")}
                      {...field}
                    />
                  )}
                </Field>
                {errors.password1 && touched.password1 && (
                  <div className="text-red-500 text-sm">{errors.password1}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password2">
                  {t("register.labelConfirmPassword")}
                </Label>
                <Field name="password2">
                  {({ field }: FieldProps) => (
                    <Input
                      id="password2"
                      type="password"
                      placeholder={t("register.confirmPasswordPlaceholder")}
                      {...field}
                    />
                  )}
                </Field>
                {errors.password2 && touched.password2 && (
                  <div className="text-red-500 text-sm">{errors.password2}</div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? t("register.buttonIsSubmitting")
                  : t("register.buttonSubmit")}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          {t("register.cardFooter")}{" "}
          <FormLink
            type="signupModal"
            text={t("register.cardFooterLink")}
            onSwitchToLogin={onSwitchToLogin}
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegistrationFormContent;
