import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material"
import React from "react"
import { useRouter } from "next/router"

export default function contributor() {
    const router = useRouter()

    const handlePath = (path) => {
        router.push(path)
    }

    return (
        <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={5}>
                <CardActionArea onClick={() => handlePath("/whistleblower/report")}>
                    <Card
                        style={{
                            height: "50vh",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Send a report
                            </Typography>
                            <Typography variant="body2">
                                This is used to send a report to the reporter
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>

            <Grid item xs={5}>
                <CardActionArea onClick={(e) => console.log(e)}>
                    <Card
                        style={{
                            height: "50vh",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div">
                                View Connections
                            </Typography>
                            <Typography variant="body2">
                                This is used to view the connections
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
        </Grid>
    )
}
