import "@rainbow-me/rainbowkit/styles.css"
import { useRouter } from "next/router"
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import Image from "next/image"

export default function Home() {
    const router = useRouter()

    const handleClick = (path) => {
        router.push(path)
    }

    return (
        <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={5}>
                <Card>
                    <CardActionArea onClick={() => handleClick("journalist")}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src="/assets/reporter.png"
                                alt="journalist"
                                width={100}
                                height={100}
                            />
                            <Typography variant="h5" component="div">
                                Journalist Entry
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={5}>
                <Card>
                    <CardActionArea onClick={() => handleClick("whistleblower")}>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src="/assets/blower.png"
                                alt="whistleblower"
                                width={100}
                                height={100}
                            />
                            <Typography variant="h5" component="div">
                                Whistleblower Entry
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    )
}
