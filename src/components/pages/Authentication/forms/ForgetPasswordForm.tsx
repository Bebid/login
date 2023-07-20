import { useReducer, useContext } from "react";
import {
    Stack,
    TextField,
    Button,
    Alert,
    AlertTitle,
    Link,
    Typography,
} from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useForm } from "react-hook-form";
import { Auth, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { formReducer, formInitState } from "../../../../reducers/formReducer";
import { getErrMessage } from "../../../../libs/firebase/errorMessages";
import { AuthContext, authContext } from "../../../../App";
import Announcement from "../../../UI/Announcement";
import CenteredContent from "../../../../layouts/CenteredContent";
import MyLink from "../../../UI/MyLink";

type ForgetPasswordForm = {
    email: string;
};

function ForgetPassword() {
    const { auth } = useContext(authContext) as AuthContext;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgetPasswordForm>();

    const [formReducerState, formReducerDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const onSubmit = (data: ForgetPasswordForm) => {
        formReducerDispatch({ type: "SUBMITTING" });

        sendPasswordResetEmail(auth as Auth, data.email)
            .then(() => {
                formReducerDispatch({ type: "SUCCESS" });
            })
            .catch((error) => {
                formReducerDispatch({
                    type: "FAILED",
                    payload: { error: getErrMessage(error.code) },
                });
            });
    };

    const navigate = useNavigate();

    return formReducerState.status === "D" && !formReducerState.error ? (
        <Announcement
            icon={
                <MarkEmailReadOutlinedIcon
                    color="success"
                    sx={{ fontSize: "40px" }}
                ></MarkEmailReadOutlinedIcon>
            }
            title="Check you email"
            description="We have sent password recover instruction to your email"
        >
            <Typography variant="body2">
                Did not receive the email? Check your spam filter
                <br /> or try{" "}
                <Link href="#" onClick={() => navigate(0)}>
                    another email address
                </Link>
            </Typography>
        </Announcement>
    ) : (
        <CenteredContent
            title="Forgot Password?"
            description="Enter the email address associated with your account."
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        {formReducerState.status === "D" &&
                            !!formReducerState.error && (
                                <Alert severity="error">
                                    <AlertTitle>
                                        {formReducerState.error?.title}
                                    </AlertTitle>
                                    {formReducerState.error?.details}
                                </Alert>
                            )}
                        <TextField
                            error={!!errors.email}
                            label="Email"
                            helperText={errors.email?.message}
                            {...register("email", {
                                required: "Please enter your email",
                                validate: {
                                    isNotExist: async (email) => {
                                        const response = await axios.get(
                                            `https://login-aa13c-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`
                                        );
                                        return (
                                            Object.keys(response.data)
                                                .length !== 0 ||
                                            "Email address is not registered"
                                        );
                                    },
                                },
                            })}
                        ></TextField>
                        <Button
                            variant="contained"
                            disableElevation
                            type="submit"
                            disabled={formReducerState.status === "P"}
                        >
                            Send instructions
                        </Button>
                    </Stack>
                    <Typography>
                        Remember Password?&nbsp;
                        <MyLink to="/login">Login</MyLink>
                    </Typography>
                </Stack>
            </form>
        </CenteredContent>
    );
}

export default ForgetPassword;
