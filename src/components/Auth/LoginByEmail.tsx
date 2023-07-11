import { useReducer, useContext, useState } from "react";
import {
    Stack,
    Alert,
    AlertTitle,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Typography,
    Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { formReducer, formInitState } from "./Reducers/formReducer";
import { LoginByEmailForm } from "./types";
import { getErrMessage } from "../../firebase/errorMessages";
import { AuthContext, authContext } from "../../App";

function LoginByEmail() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginByEmailForm>();

    const [passVis, setPassVis] = useState(false);

    const [formReducerState, formReducerDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const navigate = useNavigate();

    const { auth } = useContext(authContext) as AuthContext;

    const onSubmit = (data: LoginByEmailForm) => {
        formReducerDispatch({ type: "SUBMITTING" });
        signInWithEmailAndPassword(auth as Auth, data.email, data.password)
            .then(() => {
                formReducerDispatch({ type: "SUCCESS" });
                navigate("/dashboard");
            })
            .catch((error) => {
                formReducerDispatch({
                    type: "FAILED",
                    payload: {
                        error: getErrMessage(error.code),
                    },
                });
            });
    };

    return (
        <form id="form-login" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
                <Stack spacing={2}>
                    {!!formReducerState.error && (
                        <Alert severity="error">
                            <AlertTitle>
                                {formReducerState.error?.title}
                            </AlertTitle>
                            {formReducerState.error?.details}
                        </Alert>
                    )}
                    <TextField
                        error={!!errors.email}
                        variant="outlined"
                        label="Email"
                        type="text"
                        id="email"
                        helperText={errors.email?.message}
                        {...register("email", {
                            required: "Please enter your email address",
                            pattern: {
                                value: /[^\s]*@[a-z0-9.-]*/i,
                                message: "Please enter a valid email address",
                            },
                        })}
                    ></TextField>
                    <TextField
                        error={!!errors.password}
                        type={passVis ? "text" : "password"}
                        id="password"
                        label="Password"
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Please enter a password",
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {passVis ? (
                                        <IconButton
                                            aria-label="hide-password"
                                            disableRipple
                                            onClick={() =>
                                                setPassVis((state) => !state)
                                            }
                                        >
                                            <VisibilityOffIcon></VisibilityOffIcon>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            aria-label="show-password"
                                            disableRipple
                                            onClick={() =>
                                                setPassVis((state) => !state)
                                            }
                                        >
                                            <VisibilityIcon></VisibilityIcon>
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                    <Link
                        component={RouterLink}
                        to="/forgot_password"
                        style={{ textDecoration: "none" }}
                    >
                        Forget Password?
                    </Link>
                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={formReducerState.status === "P"}
                    disableElevation
                    size="large"
                >
                    Login
                </Button>
                <Typography>
                    Doesn't have an account?{" "}
                    <Link
                        component={RouterLink}
                        to="/signup"
                        style={{ textDecoration: "none" }}
                    >
                        Signup
                    </Link>
                </Typography>
            </Stack>
        </form>
    );
}

export default LoginByEmail;
