export type Error = {
    title: string;
    details: string;
} | null;

export const getErrMessage = (errCode: string) => {
    switch (errCode) {
        case "auth/email-already-in-use":
            return {
                title: "Email already in use",
                details:
                    "It seems that the email you are registering has been already used. Please use another one.",
            };
        case "auth/wrong-password":
            return {
                title: "Wrong password",
                details: "Please make sure you type your password correctly.",
            };
        case "auth/user-not-found":
            return {
                title: "Email not found",
                details: "Please make sure you type your email correctly.",
            };
        case "auth/invalid-phone-number":
            return {
                title: "Invalid Phone Number",
                details:
                    "Please make sure you type your phone number correctly.",
            };
        case "auth/invalid-verification-code":
            return {
                title: "Invalid Code",
                details:
                    "Please make sure you enter the latest code you receive.",
            };
        case "auth/invalid-action-code":
            return {
                title: "Invalid code",
                details:
                    "Please try to reset your password again in Forget Password Page",
            };
        default:
            return {
                title: "Server failure",
                details: "Something went wrong. Please contact administrator.",
            };
    }
};
