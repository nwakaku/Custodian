import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import reporterABI from '../constants/abis/reporter.json'
import { useAccount, useContractRead, useSigner } from "wagmi"
import { reporterAddr } from "../constants"

const card = (name, email, org) => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Your Profile
            </Typography>
            <Typography variant="h5" component="div">
                Name: {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Org: {org}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Email: {email}
            </Typography>
            <Typography variant="body2">Professional Field: Crypto, Finance, Digital Life, etc</Typography>
        </CardContent>
    </React.Fragment>
)

export default function OutlinedCard() {
    const { address } = useAccount()
    const [org, setOrg] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")

    const { data:reporterData=[], status } = useContractRead({
        address: reporterAddr,
        abi: reporterABI,
        functionName: "getReporterInfoWithAddress",
        args: ["0x7c7cd30A10eEA6Ac72613182a97994589f5181EA"]
    })

    useEffect(() => {
        console.log(status)
    }, [status])

    useEffect(() => {
        console.log(reporterData)
        if(reporterData.length === 0){
            return
        }
        setOrg(reporterData.org)
        setEmail(reporterData.email)
        setName(reporterData.name)
    }, [reporterData])
    return (
        <Box sx={{                        display: "flex",
        flexDirection: "column",
        alignItems: "center", }}>
            <Card variant="outlined">{card(name, email, org)}</Card>
        </Box>
    )
}
