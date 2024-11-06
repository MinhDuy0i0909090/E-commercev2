import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config/index";
import { Card } from "antd";
import { registerUser } from "../../store/auth-slice/authSlice";
import { notification } from "antd";
const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit() {
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        notification.success({
        
          description: data?.payload?.message,
        });
        navigate("/auth/login");
      } else 
      {
        notification.error({
          description: data?.payload?.message,
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground ">
            Create new account
          </h1>
          <p>
            Already have a account?
            <Link
              className="font-medium ml-2 text-blue-700 hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign up"}
          formData={formData}
          setFormData={setformData}
          onSubmit={onSubmit}
          placement={"vertical"}
        />
      </Card>
    </div>
  );
}

export default AuthRegister;
