import { Form, Layout, Input, Button, Typography } from "antd";
import { useLoader } from "../../../context/LoaderContext";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./index.scss";
import type { SignInUserDTO } from "../../../types/dto";
import { authService } from "../../../services/auth.service";

const { Title, Text, Link } = Typography;

const Signin = () => {
  const { loading } = useLoader();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const payload: SignInUserDTO = {
      email: values.email,
      password: values.password,
    };

    const response = await authService.signIn(payload);
    console.log(response);
  };

  return (
    <Layout className="h-full w-full flex items-center justify-center">
      <section className="w-full h-screen">
        <div className="flex  flex-col md:flex-row justify-center items-center w-full h-full">
          <div className="w-full hidden md:block md:w-1/2 h-screen signin-left-section"></div>
          <div className="w-full md:w-1/2 h-screen flex flex-col justify-center xl:px-28  md:py-14 py-6 lg:px-20 px-8 sm:px-6 bg-white">
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
