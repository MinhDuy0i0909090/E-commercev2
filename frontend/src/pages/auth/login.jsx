import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "../../components/common/form";
import { loginFormControls } from "../../config/index";
import { Card, notification } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice/authSlice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit() {
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        notification.success({
          description: data?.payload?.message,
        });
      } else {
        notification.error({ description: data?.payload?.message });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground ">
            Sign in to your account
          </h1>
          <p>
            Don&apos;t have a account?
            <Link
              className="font-medium ml-2 text-blue-700 hover:underline"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign in"}
          formData={formData}
          setFormData={setformData}
          onSubmit={onSubmit}
          placement={"vertical"}
        />
      </Card>
    </div>
  );
}

export default AuthLogin;
