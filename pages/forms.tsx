import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
    username: string;
    password: string;
    email: string;
    errors?: string;
};

export default function Forms() {
    const { register, handleSubmit, formState:{errors}, watch, setError, setValue, reset, resetField } = useForm<LoginForm>({mode:"onChange"});
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
            {errors.username?.message}
            <input
                {...register("email",{
                    required:"Email is required",
                    validate:{
                        notGmail:(value) => !value.includes("@gmail.com") || "Gmail NO"
                    }
                })}
                type="email"
                placeholder="Email"
                required
            />
            {errors.email?.message}
            <input
                {...register("password", {required:"Password is required"})}
                type="password"
                placeholder="Password"
                required
            />
            {errors.errors?.message}
            <input type="submit" value="Create Account" />
        </form>
    );
}