import React, {useState} from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';

// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Typography from '@mui/material/Typography';


import { Task } from '../../types';
import WeeklyCalendar from './WeeklyCalendar';

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface Props {
    taskData: Task[]
}

const Schedule = ({taskData} : Props ) => {
    const [date, setDate] = useState(new Date())

    return (
        <WeeklyCalendar taskData={taskData} date={date} onChange={(newDate) => setDate(newDate)}/>
        // <Container sx={{ bgcolor: '#cfe8fc' }}>
        // <Box sx={{ flexGrow: 1 }}>
        //     <Grid container style={{width: '90%', margin: '0 auto' }} spacing={1} >
        //         <Grid container item spacing={1} columns={7}>
        //             {
        //                 weekDays.map((day, index) => (
        //                     <Grid key={index} item xs={1}>
        //                         <Item>{day}</Item>
        //                     </Grid>
        //                 ))
        //             }
        //         </Grid>
        //         <Grid container item spacing={1} columns={7}>
        //             {
        //                 taskCategories.map((category, index) => (
        //                     <Grid key={index} container item spacing={1}>
        //                         <Grid item xs={7}> 
        //                             <Item> {category}</Item>
        //                         </Grid>
        //                         {
        //                             weekDays.map((day, index) => {
        //                                 // const tasksOnDay = 
        //                                 return (
        //                                 <Grid item key={index} xs={1}>
        //                                     <Item>{day}</Item>
        //                                 </Grid>
        //                                 )}
        //                             )
        //                         }
        //                     </Grid>
        //                 ))
        //             }
        //         </Grid>
    
        //     </Grid>
        // </Box>
        // </Container>
    )
}



export default Schedule