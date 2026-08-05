import LoginForm from "../components/auth/LoginForm";

export default function Login() {

    return (

        <div
            style={{
                maxWidth: "400px",
                margin: "100px auto"
            }}
        >

            <h1>Login</h1>

            <LoginForm />

        </div>

    );

}