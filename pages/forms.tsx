import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
    username: string;
    password: string;
    email: string;
};

export default function Forms() {
    const { register, handleSubmit } = useForm<LoginForm>();
    const onValid = (data:LoginForm) => {
        console.log("I'm valid bby");
    };
    const onInvalid = (errors:FieldErrors) => {
        console.log(errors);
    };
    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <input
                {...register("username",{
                    required: "Username is required",
                    minLength:{
                        message:"longer than 5",
                        value:5
                    },
                })}
                type="text"
                placeholder="Username"
            />
            <input
                {...register("email",{required:"Email is required"})}
                type="email"
                placeholder="Email"
                required
            />
            <input
                {...register("password", {required:"Password is required"})}
                type="password"
                placeholder="Password"
                required
            />
            <input type="submit" value="Create Account" />
        </form>
    );
}