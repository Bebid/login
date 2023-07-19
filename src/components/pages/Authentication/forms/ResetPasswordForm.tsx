import { useReducer, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
    Stack,
    Alert,
    AlertTitle,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Typography,
} from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Auth, confirmPasswordReset } from "firebase/auth";

import { formReducer, formInitState } from "../../../../reducers/formReducer";
import { ResetPasswordForm } from "../../../../assets/types/types";
import { AuthContext, authContext } from "../../../../App";
import { getErrMessage } from "../../../../libs/firebase/errorMessages";
import Announcement from "../../../UI/Announcement";
import MyLink from "../../../UI/MyLink";
import CenteredContent from "../../../../layouts/CenteredContent";

function ResetPassword() {
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordForm>();

    const [formReducerState, formReducerDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const [searchParams] = useSearchParams();
    const actionCode: string = searchParams.get("oobCode") || "";

    const { auth } = useContext(authContext) as AuthContext;

    const [passVis, setPassVis] = useState(false);
    const [conPassVis, setConPassVis] = useState(false);

    const onSubmit = (data: ResetPasswordForm) => {
        formReducerDispatch({ type: "SUBMITTING" });

        confirmPasswordReset(auth as Auth, actionCode, data.newPass)
            .then(() => {
                formReducerDispatch({ type: "SUCCESS" });
            })
            .catch((response) => {
                formReducerDispatch({
                    type: "FAILED",
                    payload: {
                        error: getErrMessage(response.code),
                    },
                });
            });
    };

    return formReducerState.status === "D" && !formReducerState.error ? (
        <Announcement
            icon={
                <TaskAltOutlinedIcon
                    color="success"
                    style={{ fontSize: "40px" }}
                />
            }
            title="Password reset!"
            description="You can now use your new password to log in to your account."
        >
            <Typography>
                <MyLink to="/login">Continue to Login</MyLink>
            </Typography>
        </Announcement>
    ) : (
        <CenteredContent
            title="Reset Password"
            description="Set a new secured password for your account."
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
                            type={passVis ? "text" : "password"}
                            error={!!errors.newPass}
                            label="New Password"
                            helperText={errors.newPass?.message}
                            {...register("newPass", {
                                required: "Please enter your new password",
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
                                                    setPassVis(
                                                        (state) => !state
                                                    )
                                                }
                                                disableRipple
                                            >
                                                <VisibilityOffIcon></VisibilityOffIcon>
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() =>
                                                    setPassVis(
                                                        (state) => !state
                                                    )
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
                            type={conPassVis ? "text" : "password"}
                            error={!!errors.confirmNewPass}
                            label="Confirm New Password"
                            helperText={errors.confirmNewPass?.message}
                            {...register("confirmNewPass", {
                                required: "Please confirm your new password",
                                validate: {
                                    isSame: (field) => {
                                        return (
                                            field === getValues("newPass") ||
                                            "Passwords are not the same"
                                        );
                                    },
                                },
                            })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {conPassVis ? (
                                            <IconButton
                                                onClick={() =>
                                                    setConPassVis(
                                                        (state) => !state
                                                    )
                                                }
                                                disableRipple
                                            >
                                                <VisibilityOffIcon></VisibilityOffIcon>
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() =>
                                                    setConPassVis(
                                                        (state) => !state
                                                    )
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
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formReducerState.status === "P"}
                        disableElevation
                    >
                        Reset Password
                    </Button>
                    <Typography>
                        Remember Password? <MyLink to="/login">Login</MyLink>
                    </Typography>
                </Stack>
            </form>
        </CenteredContent>
    );
}

export default ResetPassword;
