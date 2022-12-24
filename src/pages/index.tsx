import type {ChangeEvent} from 'react';
import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    FormGroup,
    List,
    ListItem,
    TextField,
    Typography
} from '@mui/material';
import type {NextPage, NextPageContext} from "next";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import classes from './index.module.scss';

interface HomeProps {
    b: number;
    c: number;
}

// get server side props
export const getServerSideProps = async (context: NextPageContext) => {

    // get b and c from url query params

    const b = context.query.b;
    const c = context.query.c;

    return {
        props: {
            b: b ? parseInt(b.toString()) : 1,
            c: c ? parseInt(c.toString()) : 0
        }
    }


}


const Home: NextPage<HomeProps> = ({b, c}: HomeProps) => {
    const [trB, setTrB] = useState<number>(b);
    const [trC, setTrC] = useState<number>(c);

    const [result, setResult] = useState<Array<Array<number>> | null>(null);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [resultTime, setResultTime] = useState<string>();

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


    const handleB = (e: ChangeEvent) => {

        setTrB(Number((e.target as HTMLInputElement).value));

    }

    const handleC = (e: ChangeEvent) => {
        setTrC(Number((e.target as HTMLInputElement).value));
    }


    useEffect(() => {
        console.log('use effect');
        console.log(trB, trC);
        const fT = findTrinomous(Number(trB), Number(trC));

        console.log(fT);


        setResult(fT);
    }, []);

    useEffect(() => {
        // change query params
        window.history.replaceState({}, '', `/?b=${trB}&c=${trC}`);
        console.log('calculating: ', findTrinomous(trB, trC));
        setResult(findTrinomous(trB, trC));

    }, [trB, trC]);


    return (
        <>


                    <Box display="flex" justifyContent="center"
                         alignItems="center"
                          flexDirection={"column"}>
                        <Box className={classes.fields}>
                            <TextField
                                onChange={handleB}
                                value={trB}
                                type={"number"}
                                fullWidth
                                label={"B"} variant={"filled"}

                            />

                            <Divider className={classes.divider}/>

                            <TextField
                                onChange={handleC}
                                value={trC}
                                type={"number"}
                                fullWidth
                                label={"C"}
                                variant={"filled"}
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
                                            <ListItem key={index} sx={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}>
                                                <Typography>
                                                    Variant {index + 1}:
                                                </Typography>

                                                <Typography
                                                    sx={{display: "block"}}>
                                                    {res[0]} + {res[1]} = {trB}
                                                </Typography>
                                                <Typography
                                                    sx={{display: "block"}}>
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
                        {/*  Button to copy url  */}

                        <Button onClick={
                            () => {
                                navigator.clipboard.writeText(window.location.href).then(r => console.log(r));
                            }
                        } variant={"contained"} endIcon={<ContentCopyIcon/>}>Copy
                            URL</Button>
                    </Box>

        </>
    );
};

export default Home;
