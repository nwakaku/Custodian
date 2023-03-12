import React, { useEffect } from "react"
import styles from "../styles/Inbox.module.css"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import lighthouse from "@lighthouse-web3/sdk"

import { reportManageAddr } from "../constants"
import reportMangeABI from "../constants/abis/reportManage.json"
import { useAccount, useContractRead, useSigner } from "wagmi"
import { Typography } from "@mui/material"

export default function Inbox() {
    const { address } = useAccount()

    const { data = [] } = useContractRead({
        address: reportManageAddr,
        abi: reportMangeABI,
        functionName: "getRecToReport",
        args: [address],
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    const { data: signer } = useSigner()

    const sign_auth_message = async () => {
        const publicKey = (await signer.getAddress()).toLowerCase()
        const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
        const signedMessage = await signer.signMessage(messageRequested)
        return { publicKey: publicKey, signedMessage: signedMessage }
    }

    const handleDownload = async (reportId, filename) => {
        const { publicKey, signedMessage } = await sign_auth_message()
        const keyObject = await lighthouse.fetchEncryptionKey(reportId, publicKey, signedMessage)
        const decrypted = await lighthouse.decryptFile(reportId, keyObject.data.key)
        const url = URL.createObjectURL(decrypted)
        // download file
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.itemshead}>
                    <p>Inbox</p>
                    <Divider></Divider>
                </div>
                {data.length === 0 ? (
                    <div>
                        <ListItemButton alignItems="flex-start">
                            <ListItemText primary="You don't have any messages right now"></ListItemText>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </div>
                ) : (
                    <div className={styles.itemsbody}>
                        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                            {data.map((it, index) => {
                                return (
                                    <div key={index}>
                                        <ListItemButton
                                            onClick={() => handleDownload(it[0], it[1])}
                                            alignItems="flex-start"
                                        >
                                            <ListItemText primary={it[1]}></ListItemText>
                                        </ListItemButton>
                                        <Divider variant="inset" component="li" />
                                    </div>
                                )
                            })}
                        </List>
                    </div>
                )}
            </div>
        </div>
    )
}
