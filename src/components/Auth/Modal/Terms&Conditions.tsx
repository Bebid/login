import React, { useState } from "react";

import {
    Typography,
    Checkbox,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    FormControlLabel,
    FormGroup,
} from "@mui/material";

type TermsConditionProps = {
    accept: () => void;
    decline: () => void;
    value: boolean;
};

function TermsConditions({ accept, decline, value }: TermsConditionProps) {
    const [dialog, setDialog] = useState(false);

    const checkboxUpdate = (
        _: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        checked ? accept() : decline();
    };

    const submitDialog = (checked: boolean) => {
        checked ? accept() : decline();
        setDialog(false);
    };

    const showDialog = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDialog(true);
    };

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox onChange={checkboxUpdate} checked={value} />
                    }
                    label={
                        <Typography>
                            I have read and agree to&nbsp;
                            <Link
                                onClick={showDialog}
                                style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Terms & Condition
                            </Link>
                        </Typography>
                    }
                ></FormControlLabel>
            </FormGroup>
            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Terms & Conditions
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thank you for choosing our app. By using this app, you
                        acknowledge and agree to the following disclaimer
                        regarding the collection and use of your personal data.
                        <br />
                        <br />
                        Data Collection: <br />
                        Our app collects user email addresses, passwords, and
                        other relevant user data for the purpose of providing
                        you with a personalized and secure experience. <br />
                        <br />
                        Data Usage: <br />
                        We respect your privacy and will only use the collected
                        data for the intended purposes of the app. This includes
                        authentication, personalized content delivery, and
                        improving our services. <br />
                        <br />
                        Data Security: <br />
                        We employ industry-standard security measures to protect
                        your personal data from unauthorized access, loss, or
                        misuse. However, please be aware that no security system
                        is completely foolproof, and we cannot guarantee the
                        absolute security of your data.
                        <br />
                        <br />
                        Data Sharing: <br />
                        We do not sell, rent, or disclose your personal data to
                        any third parties without your explicit consent, except
                        as required by law or for the proper functioning of the
                        app. <br />
                        <br />
                        User Responsibility: <br />
                        It is your responsibility to ensure the accuracy and
                        confidentiality of the information you provide in the
                        app. Please refrain from sharing sensitive or personally
                        identifiable information that is not required for the
                        app's functionality. <br />
                        <br />
                        Third-Party Links: <br />
                        Our app may contain links to third-party websites or
                        services. We are not responsible for the privacy
                        practices or content of these external sites. Please
                        review their privacy policies before providing any
                        personal information. <br />
                        <br />
                        Consent: <br />
                        By using our app, you consent to the collection,
                        processing, and storage of your personal data as
                        outlined in this disclaimer. <br />
                        <br />
                        Please note that this disclaimer may be subject to
                        updates or revisions. We encourage you to periodically
                        review this disclaimer for any changes. If you have any
                        concerns or questions regarding the collection or use of
                        your personal data, please contact us at
                        bebid28@gmail.com. <br />
                        <br />
                        By continuing to use our app, you agree to the terms and
                        conditions stated in this disclaimer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => submitDialog(false)}>Decline</Button>
                    <Button
                        onClick={() => submitDialog(true)}
                        variant="contained"
                        disableElevation
                        autoFocus
                    >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TermsConditions;
