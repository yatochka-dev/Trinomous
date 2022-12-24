import type {ChangeEvent} from 'react';
import React, {useEffect, useState} from 'react';
import {
    Box,
    CircularProgress,
    Container,
    Divider,
    FormGroup,
    List, ListItem,
    TextField,
    Typography
} from '@mui/material';
import type {NextPage} from "next";
import classes from './index.module.scss';

const Home: NextPage = () => {
    const [trB, setTrB] = useState<number>(0);
    const [trC, setTrC] = useState<number>(0);

    const [result, setResult] = useState<Array<Array<number>> | null>(null);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [resultTime, setResultTime] = useState<string>();

    const handleB = (e: ChangeEvent) => {

        setTrB(Number((e.target as HTMLInputElement).value));

    }

    const handleC = (e: ChangeEvent) => {
        setTrC(Number((e.target as HTMLInputElement).value));
    }

    useEffect(() => {
        // const findTrinomous = (b: number, c: number): Array<number> | null => {
        //     setCalculating(true);
        //     const startTime = performance.now();
        //
        //     let results: Array<Array<number>> = [];
        //
        //     for (let i = -1000; i < 1000; i++) {
        //         for (let j = -1000; j < 1000; j++) {
        //             if (i + j === b && i * j === c) {
        //                 const endTime = performance.now();
        //
        //                 setResultTime(`Time taken: ${endTime - startTime}ms`);
        //                 setCalculating(false);
        //
        //                 results.push([i, j]);
        //
        //
        //             }
        //         }
        //     }
        //
        //     const endTime = performance.now();
        //     setResultTime(`Time taken: ${endTime - startTime}ms`);
        //     setCalculating(false);
        //     return null;
        // }

        const findTrinomous: (b: number, c: number, results?: Array<Array<number>>) => (Array<Array<number>>) = (
            b: number,
            c: number,
            results: Array<Array<number>> = [],
        ) => {

            if (b === 0 && c === 0) {
                return results;
            }

            setCalculating(true);
            const startTime = performance.now();

            for (let i = -1000; i < 1000; i++) {
                for (let j = -1000; j < 1000; j++) {
                    if (i + j === b && i * j === c && !results.some((result) => result[0] === i && result[1] === j)) {
                        const endTime = performance.now();

                        setResultTime(`Time taken: ${endTime - startTime}ms`);
                        setCalculating(false);

                        results.push([i, j]);

                        return findTrinomous(b, c, results);
                    }
                }
            }

            const endTime = performance.now();
            setResultTime(`Time taken: ${endTime - startTime}ms`);
            setCalculating(false);
            return results;

        }

        console.log('calculating: ', findTrinomous(trB, trC));
        setResult(findTrinomous(trB, trC));
    }, [trB, trC]);

    return (
        <Container>
            <FormGroup>
                <Box display="flex" justifyContent="center" alignItems="center"
                     height="100vh" flexDirection={"column"}>
                    <Box className={classes.fields}>
                        <TextField
                            onChange={handleB}
                            value={trB}
                            type={"number"}
                            fullWidth
                        />

                        <Divider className={classes.divider}/>

                        <TextField
                            onChange={handleC}
                            value={trC}
                            type={"number"}
                            fullWidth
                        />
                    </Box>
                    <Divider/>
                    <Box className={classes.res}>
                        <Typography
                            id="basic-list-demo"
                            textTransform="uppercase"
                            fontWeight="lg"
                        >
                            Results:
                        </Typography>
                        <List aria-labelledby="basic-list-demo">

                            {
                                result !== null && result.length > 0 ? (

                                    result.map((res, index) => (
                                        <ListItem key={index} sx={{display: "flex", flexDirection: "column"}}>
                                            <Typography>
                                                Variant {index + 1}:
                                            </Typography>

                                            <Typography sx={{display: "block"}}>
                                                {res[0]} + {res[1]} = {trB}
                                            </Typography>
                                            <Typography sx={{display: "block"}}>
                                                {res[0]} * {res[1]} = {trC}
                                            </Typography>
                                            <Divider/>
                                        </ListItem>
                                    ))) : (
                                    <Typography>
                                        No results found
                                    </Typography>
                                )
                            }

                        </List>
                        <Typography>
                            {result !== null && resultTime !== undefined ? resultTime : ''}
                        </Typography>
                        {calculating && (
                            <Typography>
                                Calculating...
                                <CircularProgress/>
                            </Typography>
                        )}
                    </Box>
                </Box>
            </FormGroup>
        </Container>
    );
};

export default Home;
