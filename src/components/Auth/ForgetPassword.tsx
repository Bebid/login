import { useReducer, useContext } from "react";
import {
    Stack,
    Grid,
    TextField,
    Button,
    Alert,
    AlertTitle,
    Collapse,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Auth, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";
import { Link } from "react-router-dom";

import { ForgetPasswordForm } from "./types";
import { formReducer, formInitState } from "./Reducers/formReducer";
import { getErrMessage } from "../../firebase/errorMessages";
import { AuthContext, authContext } from "../../App";

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Collapse
                    in={
                        formReducerState.status === "D" &&
                        !formReducerState.error
                    }
                >
                    <Alert severity="success">
                        <AlertTitle>Mail sent</AlertTitle>
                        Check your email to see how you can change your
                        password.
                    </Alert>
                </Collapse>
                <Collapse
                    in={
                        formReducerState.status === "D" &&
                        !!formReducerState.error
                    }
                >
                    <Alert severity="error">
                        <AlertTitle>
                            {formReducerState.error?.title}t
                        </AlertTitle>
                        {formReducerState.error?.details}
                    </Alert>
                </Collapse>
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
                                    Object.keys(response.data).length !== 0 ||
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
                    Send Email
                </Button>
                <Link to="/login">Login</Link>
            </Stack>
        </form>
    );
}

export default ForgetPassword;
