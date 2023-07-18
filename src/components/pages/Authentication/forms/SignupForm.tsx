import { useReducer, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import {
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Stack,
    Alert,
    AlertTitle,
    Typography,
    Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import axios from "axios";

import { SignupForm, UserDetails } from "../../../../assets/types/types";
import { getErrMessage } from "../../../../libs/firebase/errorMessages";
import { formReducer, formInitState } from "../../../../reducers/formReducer";
import { AuthContext, authContext } from "../../../../App";
import TermsConditions from "../../../UI/Terms&Conditions";

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignupForm>();

    const [formReducerState, formReducerDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const [passVis, setPassVis] = useState(false);
    const [conPassVis, setConPassVis] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const { auth, user } = useContext(authContext) as AuthContext;

    const db = getDatabase();

    const navigate = useNavigate();

    const saveUserToDB = (userDetails: UserDetails) => {
        set(ref(db, "users/" + auth?.currentUser?.uid), userDetails);
    };

    const onSubmit = (data: SignupForm) => {
        formReducerDispatch({ type: "SUBMITTING" });

        if (!agreeToTerms) {
            formReducerDispatch({
                type: "FAILED",
                payload: {
                    error: {
                        title: "Terms & Condition Required",
                        details:
                            "Please indicate that you have read and agree to the Terms and Conditions",
                    },
                },
            });
            return;
        }

        createUserWithEmailAndPassword(auth as Auth, data.email, data.password)
            .then(() => {
                formReducerDispatch({ type: "SUCCESS" });
                saveUserToDB({ username: data.username, email: data.email });
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        error={!!errors.username}
                        label="Username"
                        {...register("username", {
                            required: "Please enter a username",
                            validate: {
                                isExist: async (username) => {
                                    const response = await axios.get(
                                        `https://login-aa13c-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="username"&equalTo="${username}"`
                                    );
                                    return (
                                        Object.keys(response.data).length ===
                                            0 || "Username already exist"
                                    );
                                },
                            },
                        })}
                        helperText={errors.username?.message}
                    ></TextField>
                    <TextField
                        error={!!errors.email}
                        label="Email Address"
                        type="email"
                        helperText={errors.email?.message}
                        {...register("email", {
                            required: "Please enter an email address",
                            pattern: {
                                value: /[^\s]*@[a-z0-9.-]*/i,
                                message: "Please enter a valid email address",
                            },
                            validate: {
                                isExist: async (email) => {
                                    const response = await axios.get(
                                        `https://login-aa13c-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`
                                    );
                                    return (
                                        Object.keys(response.data).length ===
                                            0 || "Email already exist"
                                    );
                                },
                            },
                        })}
                    ></TextField>
                    <TextField
                        error={!!errors.password}
                        label="Password"
                        type={passVis ? "text" : "password"}
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Please enter a password",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\];:"'<>,.?/|\\~])[A-Za-z\d!@#$%^&*()_+\-={}[\];:"'<>,.?/|\\~]{8,}$/,
                                message: "Please enter a secured password",
                            },
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {passVis ? (
                                        <IconButton
                                            onClick={() =>
                                                setPassVis((state) => !state)
                                            }
                                            disableRipple
                                        >
                                            <VisibilityOffIcon></VisibilityOffIcon>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setPassVis((state) => !state)
                                            }
                                            disableRipple
                                        >
                                            <VisibilityIcon></VisibilityIcon>
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                    <TextField
                        error={!!errors.confirm_password}
                        label="Confirm Password"
                        type={conPassVis ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {conPassVis ? (
                                        <IconButton
                                            onClick={() =>
                                                setConPassVis((state) => !state)
                                            }
                                        >
                                            <VisibilityOffIcon></VisibilityOffIcon>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setConPassVis((state) => !state)
                                            }
                                        >
                                            <VisibilityIcon></VisibilityIcon>
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        {...register("confirm_password", {
                            required: "Please confirm your password",
                            validate: {
                                isSame: (field) => {
                                    return (
                                        field === getValues("password") ||
                                        "Password is not the same"
                                    );
                                },
                            },
                        })}
                        helperText={errors.confirm_password?.message}
                    ></TextField>
                    <TermsConditions
                        accept={() => setAgreeToTerms(true)}
                        decline={() => setAgreeToTerms(false)}
                        value={agreeToTerms}
                    />
                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={formReducerState.status === "P"}
                    disableElevation
                >
                    Signup
                </Button>
                <Typography>
                    Have an account?{" "}
                    <Link
                        component={RouteLink}
                        to="/login"
                        style={{ textDecoration: "none" }}
                    >
                        Login
                    </Link>
                </Typography>
            </Stack>
        </form>
    );
}

export default Signup;
