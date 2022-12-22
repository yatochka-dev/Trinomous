import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    Box,
    CircularProgress,
    Divider,
    FormGroup,
    TextField,
    Typography
} from '@mui/material';
import type {NextPage} from "next";

const Home: NextPage = () => {
    const [trB, setTrB] = useState<number>(0);
    const [trC, setTrC] = useState<number>(0);

    const [result, setResult] = useState<Array<number> | null>(null);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [resultTime, setResultTime] = useState<string>();

    const handleB = (e: ChangeEvent) => {

        setTrB(Number((e.target as HTMLInputElement).value));

    }

    const handleC = (e: ChangeEvent) => {
        setTrC(Number((e.target as HTMLInputElement).value));
    }

    useEffect(() => {
        const findTrinomous = (b: number, c: number): Array<number> | null => {
            setCalculating(true);
            const startTime = performance.now();

            for (let i = -1000; i < 1000; i++) {
                for (let j = -1000; j < 1000; j++) {
                    if (i + j === b && i * j === c) {
                        const endTime = performance.now();
                        setResultTime(`Time taken: ${endTime - startTime}ms`);
                        setCalculating(false);
                        return [i, j];
                    }
                }
            }

            const endTime = performance.now();
            setResultTime(`Time taken: ${endTime - startTime}ms`);
            setCalculating(false);
            return null;
        }

        console.log('calculating: ', findTrinomous(trB, trC));
        setResult(findTrinomous(trB, trC));
    }, [trB, trC]);

    return (
        <FormGroup>
            <Box display="flex" justifyContent="center" alignItems="center"
                 height="100vh" flexDirection={"column"}>
                <Box>
                    <TextField
                        onChange={handleB}
                        value={trB}
                        type={"number"}

                    />
                    <TextField
                        onChange={handleC}
                        value={trC}
                        type={"number"}
                    />
                </Box>
                <Divider/>
                <Box>
                    <Typography>
                        {result !== null ? `The result is: ${result[0]}, ${result[1]}` : 'No result'}
                        <Divider/>
                        {result !== null && resultTime !== undefined ? resultTime : ''}
                    </Typography>
                    {calculating && (
                        <Typography>
                            Calculating...
                            <CircularProgress/>
                        </Typography>
                    )}</Box>
            </Box>
        </FormGroup>
    );
};

export default Home;
