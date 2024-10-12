import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";

import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const AuthForm = () => {
  return (
    <div className="flex items-center flex-col">
      <Card className="max-w-sm w-full">
        <CardBody className="flex items-center">
          <Tabs aria-label="Options">
            <Tab key="sign-in" className="w-full text-center" title="Sign in">
              <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
              <SignInForm />
            </Tab>
            <Tab key="sign-up" className="w-full text-center" title="Sign up">
              <h1 className="text-2xl font-bold mt-4">Create your account</h1>
              <SignUpForm />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};
