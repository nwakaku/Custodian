import { Button } from "@mui/material"
import { ConnectButton } from "@rainbow-me/rainbowkit"
export const Connect = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading"
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated")
                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 1,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        style={{ color: "white" }}
                                        onClick={openConnectModal}
                                        type="button"
                                    >
                                        ConnectWallet
                                    </Button>
                                )
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button
                                        style={{ color: "red" }}
                                        onClick={openChainModal}
                                        type="button"
                                    >
                                        Wrong network
                                    </Button>
                                )
                            }
                            return (
                                <div style={{ display: "inline", gap: 12 }}>
                                    <Button
                                        onClick={openChainModal}
                                        style={{
                                            display: "inline",
                                            alignItems: "center",
                                            color: "white",
                                        }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? "Chain icon"}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </Button>
                                    <Button
                                        style={{ color: "white" }}
                                        onClick={openAccountModal}
                                        type="button"
                                    >
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ""}
                                    </Button>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}
