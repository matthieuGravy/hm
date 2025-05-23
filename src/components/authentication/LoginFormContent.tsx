import React, { useMemo } from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

import { loginUser } from "@/api/auth";
import { LoginFormContentProps } from "@/types/authentication";
import { useAuthStore } from "@/stores/authStore";
import { loginSchema } from "@/schemas/auth";
import { FormLink } from "@/components/authentication/FormLink";
import { useModalStore } from "@/stores/modalStore";

type LoginData = z.infer<typeof loginSchema>;

const LoginFormContent: React.FC<LoginFormContentProps> = ({
  onSwitchToSignUp,
}) => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { closeModal } = useModalStore();
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

  const handleSubmit = async (
    values: LoginData,
    { setSubmitting, setErrors, setStatus }: FormikHelpers<LoginData>
  ) => {
    try {
      const result = await loginUser(values);
      setLogin(result);
      setStatus({ success: t("login.successMessage") });
      navigate("/");
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ email: error.message });
        setStatus({ error: t("login.errorGeneral") });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{t("login.cardTitle")}</CardTitle>
        <CardDescription>{t("login.cardDescription")}</CardDescription>
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
                <Label htmlFor="email">{t("login.labelEmail")}</Label>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("login.emailPlaceholder")}
                      {...field}
                    />
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("login.labelPassword")}</Label>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input
                      id="password"
                      type="password"
                      placeholder={t("login.passwordPlaceholder")}
                      {...field}
                    />
                  )}
                </Field>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? t("login.buttonIsSubmitting")
                  : t("login.buttonSubmit")}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center w-full">
          {t("login.cardFooter")}{" "}
          <FormLink
            type="loginModal"
            text={t("login.cardFooterLink")}
            onSwitchToSignUp={onSwitchToSignUp}
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginFormContent;
