import { Box, Card, CardActionArea, CardContent, List, ListItem, Typography } from "@mui/material"
import React from "react"

export default function SelectFile({ files, setFiles }) {
    const inputRef = React.useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleClickFile = (e) => {
        e.preventDefault()
        setFiles(e)
        console.log(e)
    }

    const handleDropFile = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setFiles(e)
    }

    return (
        <Card sx={{ width: "100%" }}>
            <CardContent>
                <CardActionArea
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragOver}
                    onDragLeave={handleDragOver}
                    onClick={() => inputRef.current.click()}
                    onDrag={handleDropFile}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "360px",
                            border: "1px dashed #000",
                            borderRadius: "10px",
                            backgroundColor: "#f5f5f5",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h5" component="div">
                            Click or Drop to Select files
                        </Typography>
                        <input
                            style={{
                                display: "none",
                            }}
                            type="file"
                            ref={inputRef}
                            multiple
                            onChange={handleClickFile}
                        />
                    </Box>
                </CardActionArea>
            </CardContent>
            <List style={{ display: "flex", justifyContent: "center" }}>
                {files.length === 0 ? (
                    <Typography> No files </Typography>
                ) : (
                    <Typography> Uploaed! </Typography>
                )}
            </List>
        </Card>
    )
}
