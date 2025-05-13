import { Form, Layout, Input, Button, Typography } from "antd";
import { useLoader } from "../../../context/LoaderContext";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./index.scss";
import type { SignInUserDTO } from "../../../types/dto";
import { authService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../../context/AuthContext";
import { useNotificationApi } from "../../../components/Notification";

const { Title, Text, Link } = Typography;

const Signin = () => {
  const { dispatch } = useContext(authContext);
  const { loading, setLoading, setLoadingMessage } = useLoader();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const openNotification = useNotificationApi();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setLoadingMessage("Signing in...");
    const payload: SignInUserDTO = {
      email: values.email,
      password: values.password,
    };

    const response = await authService.signIn(payload);
    console.log(response);
    if (!response) {
      openNotification.error({
        message: "Error",
        description: "Invalid email or password",
      });
      setLoading(false);
      setLoadingMessage(null);
      return;
    }

    if (!response.status) {
      openNotification.error({
        message: "Error",
        description: response.message,
      });
      setLoading(false);
      setLoadingMessage(null);
      return;
    }

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        accessToken: response.accessToken,
        user: response.data,
      },
    });
    form.resetFields();
    setLoading(false);
    setLoadingMessage(null);
    openNotification.success({
      message: "Success",
      description: "Login successful",
      type: "success",
    });
    navigate("/dashboard/home");
  };

  return (
    <Layout className="h-full w-full flex items-center justify-center">
      <section className="w-full h-screen">
        <div className="flex  flex-col md:flex-row justify-center items-center w-full h-full">
          <div className="w-full hidden md:block md:w-1/2 h-screen signin-left-section"></div>
          <div className="w-full md:w-1/2 h-screen flex flex-col justify-center xl:px-28  md:py-14 py-6 lg:px-20 px-8 sm:px-6 bg-white">
            <div className="flex flex-row justify-between gap-x-4">
              <div className="p-1 border">
                <p className="font-bold text-red-600">
                  Use below credentials for testing for new user experience
                </p>
                <p className="font-bold text-red-600">
                  email : nihal@gmail.com
                </p>
                <p className="font-bold text-red-600">password : 12345</p>
              </div>
              <div className="p-1 border">
                <p className="font-bold text-red-600">
                  Use below credentials for testing for existing user experience
                </p>
                <p className="font-bold text-red-600">email : test@gmail.com</p>
                <p className="font-bold text-red-600">password : 123</p>
              </div>
            </div>
            <Title className="text-center !text-primary mb-6">Sign In</Title>
            <div className="mt-4 flex items-center justify-center">
              <Form
                form={form}
                layout="vertical"
                onFinishFailed={(errorInfo) =>
                  console.log("Validation Failed:", errorInfo)
                }
                onFinish={handleSubmit}
                className="flex flex-col w-full signin-form"
              >
                <Form.Item
                  name="email"
                  className="text-input !mt-3"
                  label={<Text type="secondary">Email</Text>}
                  rules={[
                    { required: true, message: "Please enter valid email" },
                    {
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter valid email",
                    },
                  ]}
                  style={{ margin: 0 }}
                >
                  <Input
                    placeholder="Enter your email"
                    className=" w-[25rem] border border-[#e6ebf7] rounded pl-2"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  className="password-input !mt-3"
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid password",
                    },
                  ]}
                  style={{ margin: 0 }}
                  label={<Text type="secondary">Password</Text>}
                >
                  <Input.Password
                    type="password"
                    className="w-[25rem] border border-[#e6ebf7] rounded pl-2"
                    placeholder="Enter password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Button
                  size="large"
                  htmlType="submit"
                  disabled={loading}
                  className="bg-primary text-white mt-8 mb-4 w-full"
                >
                  Sign In
                </Button>
                <Text className="text-base font-normal text-center">
                  Don't have an account ?{" "}
                  <Link href="/auth/signup" className="ml-1 underline">
                    Sign Up
                  </Link>
                </Text>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signin;
