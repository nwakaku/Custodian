import React, { use, useEffect } from "react"
import dynamic from "next/dynamic"
import { reporterAddr } from "../../constants"
import reporterABI from "../../constants/abis/reporter.json"
const OptinForm = dynamic(() => import("../../components/OptinForm"), { ssr: false })
const OptinCard = dynamic(() => import("../../components/OptinCard"), { ssr: false })
const Inbox = dynamic(() => import("../../components/Inbox"), { ssr: false })

import { useAccount, useContractRead } from "wagmi"

export default function Reporter() {
    const { connector, isConnected, address } = useAccount()

    const { data: isOptin = false } = useContractRead({
        address: reporterAddr,
        abi: reporterABI,
        functionName: "isOptedIn",
        args: [address],
        watch: true,
    })

    useEffect(() => {
        console.log("isOptin", isOptin)
    }, [isOptin])

    return isOptin ? (
        <div>
            <OptinCard></OptinCard>
            <Inbox></Inbox>
        </div>
    ) : (
        <OptinForm></OptinForm>
    )
}
