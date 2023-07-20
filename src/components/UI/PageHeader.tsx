import { Stack, Typography } from "@mui/material";

export type PageHeaderProps = {
    title: string;
    description?: string;
};
function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <Stack spacing={2}>
            <Typography variant="h3" component="h1">
                {title}
            </Typography>
            {description && <Typography>{description}</Typography>}
        </Stack>
    );
}

export default PageHeader;
