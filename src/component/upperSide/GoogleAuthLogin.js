import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthLogin = () => {
    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login 실패");
                }}
                useOneTap
            />
        </>
    );
};

export default GoogleAuthLogin;