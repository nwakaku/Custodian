import { Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

export default function SendReport({formData, setFormData}) {
    const [encryption, setEncryption] = React.useState("")

    return (
        <Card sx={{
            width: "100vw"
        }}>
            <CardContent>
                <FormControl fullWidth>
                    <InputLabel id="form-encryption">Encryption</InputLabel>
                    <Select
                        labelId="form-encryption"
                        value={encryption || formData.encryption}
                        label="Encryption"
                        onChange={(e) => {
                            setEncryption(e.target.value)
                            setFormData({
                                ...formData,
                                encryption: e.target.value
                            })
                        }}
                    >
                        <MenuItem value="AES">AES</MenuItem>
                        <MenuItem value="Lighthouse">Lighthouse</MenuItem>
                    </Select>
                    <Divider sx={{ my: 2 }} />
                    <TextField
                        id="outlined-Duration"
                        label="Duration"
                        type="number"
                        value={formData.duration}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                duration: e.target.value
                            })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Divider sx={{ my: 2 }} />
                    <TextField
                        id="outlined-Duration"
                        label="Access Count"
                        type="number"
                        value={formData.accessCount}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                accessCount: e.target.value
                            })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
            </CardContent>
        </Card>
    )
}