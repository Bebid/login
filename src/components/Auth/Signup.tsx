import { useReducer, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
    TextField,
    InputAdornment,
    IconButton,
    Input,
    Button,
    Grid,
    Stack,
    Alert,
    AlertTitle,
    Collapse,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { SignupForm, UserDetails } from "./types";
import { getErrMessage } from "../../firebase/errorMessages";
import { formReducer, formInitState } from "./Reducers/formReducer";
import { AuthContext, authContext } from "../../App";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

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

    const { auth, user } = useContext(authContext) as AuthContext;

    const saveUserToDB = (userDetails: UserDetails) => {
        const db = getDatabase();
        set(ref(db, "users/" + auth?.currentUser?.uid), userDetails);
    };

    const onSubmit = (data: SignupForm) => {
        formReducerDispatch({ type: "SUBMITTING" });

        createUserWithEmailAndPassword(auth as Auth, data.email, data.password)
            .then(() => {
                formReducerDispatch({ type: "SUCCESS" });
                saveUserToDB({ username: data.username });
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

    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
                <Collapse in={!!formReducerState.error}>
                    <Alert severity="error">
                        <AlertTitle>{formReducerState.error?.title}</AlertTitle>
                        {formReducerState.error?.details}
                    </Alert>
                </Collapse>
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
                                    Object.keys(response.data).length === 0 ||
                                    "Username already exist"
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
                                    Object.keys(response.data).length === 0 ||
                                    "Email already exist"
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
                <Button
                    variant="contained"
                    type="submit"
                    disabled={formReducerState.status === "P"}
                    disableElevation
                >
                    Signup
                </Button>
                <Link to="/login">Login</Link>
            </Stack>
        </form>
    );
}

export default Signup;
