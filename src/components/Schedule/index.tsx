import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


import { Task } from '../../types';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface Props {
    taskData: Task[]
}

const onlyUnique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
}

const Schedule = ({taskData} : Props ) => {
    console.log("Schedule")

    const taskCategories = taskData.length > 0 ? taskData
        .map(task => task.category)
        .filter(onlyUnique) : []


    return (
        // <Container sx={{ bgcolor: '#cfe8fc' }}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} >
                <Grid container item spacing={1} columns={7}>
                    {
                        weekDays.map((day) => (
                            <Grid key={day} item xs={1}>
                                <Item>{day}</Item>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container item spacing={1} columns={7}>
                    {
                        taskCategories.map((category) => (
                            <Grid key={category} container item spacing={1}>
                                <Grid item xs={7}> 
                                    <Item> {category}</Item>
                                </Grid>
                                {
                                    weekDays.map((day) => {
                                        // const tasksOnDay = 
                                        return (
                                        <Grid item key={day} xs={1}>
                                            <Item>{day}</Item>
                                        </Grid>
                                        )}
                                    )
                                }
                            </Grid>
                        ))
                    }
                </Grid>
    
            </Grid>
        </Box>
        // </Container>
    )
}



export default Schedule