import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/redux/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();

    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };

    const handleSubmit = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        
        try {
            const response = await action(inputData).unwrap(); // Error handling improved
            toast.success(response.message || `${type} successful!`);
            if (type === "login") navigate("/");
        } catch (error) {
            toast.error(error?.data?.message || `${type} failed!`);
        }
    };

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successful.");
        }
        if (registerError) {
            toast.error(registerError?.data?.message || "Signup Failed");
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful.");
            navigate("/");
        }
        if (loginError) {
            toast.error(loginError?.data?.message || "Login Failed");
        }
    }, [loginIsSuccess, registerIsSuccess, loginData, registerData, loginError, registerError]);

    return (
        <div className="flex items-center justify-center w-full mt-20">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Make sure you have signed up before logging in.</CardDescription>
                        </CardHeader> 
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input name="email" value={loginInput.email} onChange={(e) => changeInputHandler(e, "login")} type='email' placeholder='Enter your email' />
                            </div>
                            <div className="space-y-1">
                                <Label>Password</Label>
                                <Input name="password" value={loginInput.password} onChange={(e) => changeInputHandler(e, "login")} type='password' placeholder='Enter your password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleSubmit("login")}>
                                {loginIsLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : "Login"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>Enter your details to create an account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label>Name</Label>
                                <Input name="name" value={signupInput.name} onChange={(e) => changeInputHandler(e, "signup")} type="text" placeholder='Enter your name' />
                            </div>
                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input name="email" value={signupInput.email} onChange={(e) => changeInputHandler(e, "signup")} type="email" placeholder='Enter your email' />
                            </div>
                            <div className="space-y-1">
                                <Label>Password</Label>
                                <Input name="password" value={signupInput.password} onChange={(e) => changeInputHandler(e, "signup")} type="password" placeholder='Create a password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => handleSubmit("signup")}>
                                {registerIsLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : "Signup"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Login;