import React, { useContext } from "react";
import { Button, Card, Label, TextInput, Spinner } from "flowbite-react";
import { replace, useFormik } from "formik";
import * as yup from "yup";
import { customAlertError, customAlertSuccess } from "../../config/alert/alert";
import AxiosClient from '../../config/http-gateway/http-client'
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from "react-router-dom";
// tailwindcss - flowbite-react
// Interfaz para iniciar Sesion

export default function SingInPage() {

  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campos Obligatorios"),
      password: yup.string().required("Campos Obligatorios"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient({
          url: "/auth/signin",
          method: 'POST',
          data: values
        });

        const rolAdmin = response.data.roles[0].name === 'ADMIN_ROLE';

        const rolUsuario = response.data.roles[0].name === 'USER_ROLE';

        const rolCliente = response.data.roles[0].name === 'CLIENT_ROLE';

        const usuario = response.data.user.person.user.username;

        const roles = response.data.user.person.user.roles[0].name;

        localStorage.setItem('usuario', usuario);

        localStorage.setItem('roles', roles);


        if (!response?.error) {
          dispatch({ type: "SIGNIN", payload: response.data });
          console.log("Rol del usuario:", response.data.role);
          if (rolAdmin) {
            navigate("/admin", { replace: true });
          } else if (rolUsuario) {
            navigate("/users", { replace: true });
          } else if (rolCliente) {
            navigate("/client", { replace: true });
          }
        } else throw Error("Error")
      } catch (error) {
        console.log(error);
        customAlertError("Iniciar Sesion", "Usuario y/o incorrecto", 'error')
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <form
          className="flex flex-col gap-4"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              name="username"
              id="username"
              type="text"
              placeholder="your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={
                formik.errors.username && formik.touched.username ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.username}
                  </span>
                ) : null
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              name="password"
              id="password"
              type="password"
              placeholder="your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={
                formik.errors.password && formik.touched.password ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.password}
                  </span>
                ) : null
              }
            />
          </div>
          <Button
            type="submit"
            className="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? <Spinner /> : <>Iniciar Sesión</>}
          </Button>
        </form>
      </Card>
    </div>
  );
}
