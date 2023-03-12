import {
    Box,
    Card,
    CardContent,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
} from "@mui/material"
import React, { useEffect } from "react"
import { useContractRead, useSigner } from "wagmi"
import reporterABI from "../constants/abis/reporter.json"
import { reporterAddr } from "../constants"

export default function selectReport({ checked, setChecked }) {
    const [reporters, setReporters] = React.useState([])

    const { data: signer } = useSigner()

    const { data } = useContractRead({
        abi: reporterABI,
        address: reporterAddr,
        functionName: "getReporterAccounts",
    })

    useEffect(() => {
        if (data && signer) {
            const address = signer.getAddress()
            address.then((addr) => {
                setReporters(
                    data
                        .filter((it) => it[4] != addr)
                        .map((it) => {
                            return {
                                name: it[0],
                                email: it[1],
                                org: it[2],
                                pk: it[4],
                            }
                        })
                )
            })
        }
    }, [data, signer])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value.pk)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value.pk)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <Card
            sx={{
                width: "100vw",
            }}
        >
            <CardContent>
                <Typography style={{ display: "flex", justifyContent: "center" }} variant="h5">
                    Journalist List
                </Typography>
                <List dense sx={{ width: "100%", maxWidth: 360 }}>
                    {reporters.map((reporter, index) => {
                        return (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        checked={checked.indexOf(reporter.pk) !== -1}
                                        onChange={handleToggle(reporter)}
                                    />
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <ListItemText
                                            secondary={`Email: ${reporter.email}`}
                                            primary={`Name: ${reporter.name}`}
                                        />
                                        <ListItemText secondary={`Organization: ${reporter.org}`} />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    )
}
