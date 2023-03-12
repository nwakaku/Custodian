import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"
import styles from "../styles/Home.module.css"
import { Connect } from "./CustomButton"
import Image from "next/image"
import { Typography } from "@mui/material"

export const Header = ({}) => {
    return (
        <div className={styles.head}>
            <header
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    margin: "1rem",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "bold",
                        paddingTop: "0.5rem",
                    }}
                    variant="h4"
                    component="h1"
                    gutterBottom
                >
                    Custodian
                </Typography>
            </header>
            <Connect></Connect>
        </div>
    )
}
