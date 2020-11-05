import React from 'react';
import {connect} from 'react-redux';
import {AllHtmlEntities} from 'html-entities'
import { theme } from '../../../theme';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { startQuiz } from '../../../redux/quiz/quiz.actions';

import './startQuizContainer.css';

function StartQuizComponent ({startQuiz}) {   
    const entities = new AllHtmlEntities();
    let isStartPressed = false
    let difficulty = 0, category = 0;

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function handleStartQuiz() {
        if(!isStartPressed){
            isStartPressed = true;

            //Sets form fields to values
            let amount = document.querySelector('#numOfQuestions').value;

            //Constructs url for getting question data
            let url = `https://opentdb.com/api.php?`;
            url += `amount=${amount}`;
            url += (category !== 0) ? `&category=${category}` : "";
            url += (difficulty !== 0) ? `&difficulty=${difficulty}` : "";
            url += `&type=multiple`;

            //Retrieves question data, updates state, then starts QuestionComponent
            fetch(url)
            .then(response => response.json())
            .then(data => {
                //Restructures data to work in quiz game
                const questions = []
                for(let result of data.results) {
                    const question = {choices: []}
                    question.question = entities.decode(result.question);

                    // question.choices = result.incorrect_answers;
                    for(let answer of result.incorrect_answers) {
                        question.choices.push(entities.decode(answer))
                    }
                    question.choices.push(entities.decode(result.correct_answer));
                    shuffleArray(question.choices);

                    question.answer = question.choices.indexOf(entities.decode(result.correct_answer))
                    questions.push(question);
                }
                startQuiz(questions);
            });
        }
    }

    const useStyles = makeStyles(() => ({
        paper: {
          marginTop: theme.spacing(8),
          padding: theme.spacing(1),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          fontSize: "60px",
          color: theme.palette.primary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        formControl: {
          margin: theme.spacing(0),
          width: '100%',
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
      const classes = useStyles();

    return (
        <div className="start-holder"> 
          <Container component="main" maxWidth="xs">
            <div className={`${classes.paper} test`}>
                <HelpOutlinedIcon className={classes.avatar}/>
              <Typography component="h1" variant="h5">
                Trivia Game!
              </Typography>
              <Typography component="h1" variant="h6">
                Clever right?
              </Typography>


              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl variant="filled" className={`${classes.formControl}`}>
                      <InputLabel>Category</InputLabel>
                        <Select
                          id="categories"
                          onChange={e => {category = e.target.value}}
                          defaultValue={0}
                          label="Categories"
                        >
                          <MenuItem value={0}>Any</MenuItem>
                          <MenuItem value={9}>General Knowledge</MenuItem>
                          <MenuItem value={10}>Entertainment: Books</MenuItem>
                          <MenuItem value={11}>Entertainment: Film</MenuItem>
                          <MenuItem value={12}>Entertainment: Music</MenuItem>
                          <MenuItem value={13}>Entertainment: Musicals And Theatres</MenuItem>
                          <MenuItem value={14}>Entertainment: Television</MenuItem>
                          <MenuItem value={15}>Entertainment: Video Games</MenuItem>
                          <MenuItem value={16}>Entertainment: Board Games</MenuItem>
                          <MenuItem value={17}>Science and Nature</MenuItem>
                          <MenuItem value={18}>Science: Computers</MenuItem>
                          <MenuItem value={19}>Science: Mathmatics</MenuItem>
                          <MenuItem value={20}>Mythology</MenuItem>
                          <MenuItem value={21}>Sports</MenuItem>
                          <MenuItem value={22}>Geography</MenuItem>
                          <MenuItem value={23}>History</MenuItem>
                          <MenuItem value={24}>Politics</MenuItem>
                          <MenuItem value={25}>Art</MenuItem>
                          <MenuItem value={26}>Celebreties</MenuItem>
                          <MenuItem value={27}>Animals</MenuItem>
                          <MenuItem value={28}>Vehicles</MenuItem>
                          <MenuItem value={29}>Entertainment: Comics</MenuItem>
                          <MenuItem value={30}>Science: Gadgets</MenuItem>
                          <MenuItem value={31}>Entertainment: Japanese Anime and Manga</MenuItem>
                          <MenuItem value={32}>Entertainment: Cartoon And Animations</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="numOfQuestions"
                      label="Number of Questions"
                      type="number"
                      defaultValue="5"
                      fullWidth
                      inputProps={{ min: 1, max: 50 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel>Difficulty</InputLabel>
                        <Select
                          id="difficulty"
                          defaultValue={0}
                          onChange={e => {difficulty = e.target.value}}
                          label="Difficulty"
                        >
                          <MenuItem value={0}>Any</MenuItem>
                          <MenuItem value={"easy"}>Easy</MenuItem>
                          <MenuItem value={"medium"}>Medium</MenuItem>
                          <MenuItem value={"hard"}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {handleStartQuiz()}}
                  >
                    Start Quiz
                  </Button>
              </form>
            </div>
          </Container>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    startQuiz: questions => dispatch(startQuiz(questions))
});

export default connect(
    null,
    mapDispatchToProps
)(StartQuizComponent);