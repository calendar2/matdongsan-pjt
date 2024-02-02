import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
import SignupFirst from './SignupFirst';
import SignupSecond from './SignupSecond';
import imgLogo from '../../assets/images/logo.png';
import styles from '../../styles/accounts/Signup.module.css';
import signupStore from '../../stores/signupStore';

const steps = ['', ''];

export default function HorizontalNonLinearStepper() {
  const { age, gender, regionInterest, spicyLevel } = signupStore();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  console.log(age, gender, regionInterest);
  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // 이전 버튼 함수
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const stepCheck = (check) =>
    check === 0 ? <SignupFirst /> : <SignupSecond />;

  return (
    <Box
      sx={{
        width: 'vw',
        textAlign: 'center',
        px: '25vw',
        height: 'vh',
      }}
    >
      <img src={imgLogo} alt="mainLogo" className={styles.imgLogo} />
      <Stepper
        sx={{
          px: '10vw',
        }}
        nonLinear
        activeStep={activeStep}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}
            disabled={index !== activeStep || completed[index]}
          >
            <StepButton
              // color="inherit"
              onClick={handleStep(index)}
              sx={{
                '& .MuiStepIcon-root': {
                  color: 'rgba(217, 217, 217, 0.8)',
                },
                '& .Mui-completed .MuiStepIcon-root': {
                  color: 'rgba(217, 217, 217, 0.8)',
                },
                '& .Mui-active .MuiStepIcon-root': {
                  color: 'rgba(29, 177, 119, 0.5)',
                },
              }}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box
              sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
            >
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ p: 3, px: 12 }}>
              {stepCheck(activeStep)}
            </Typography>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              {/* 이전 버튼 */}
              {/* <Button
                // color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                이전
              </Button> */}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: 'inline-block' }}
                  >
                    {/* Step {activeStep + 1} already completed */}
                    <Button
                      sx={{
                        width: '200px',
                        height: '38px',
                        margin: '10px',
                        boxShadow: '1px 1px 2px 0px gray',
                        backgroundColor: 'white',
                        color: 'rgba(29, 177, 119, 0.8)',
                        ':hover': {
                          backgroundColor: 'rgba(29, 177, 119, 0.6)',
                          color: 'white',
                        },
                        px: '5vw',
                      }}
                      onClick={handleComplete}
                    >
                      다음
                    </Button>
                  </Typography>
                ) : (
                  <Button
                    disabled={
                      (completedSteps() !== totalSteps() - 1 &&
                        (age === '' ||
                          gender === '' ||
                          regionInterest === '')) ||
                      (completedSteps() === totalSteps() - 1 &&
                        spicyLevel === '')
                    }
                    sx={{
                      width: '200px',
                      height: '38px',
                      margin: '10px',
                      boxShadow: '1px 1px 2px 0px gray',
                      backgroundColor: 'white',
                      color: 'rgba(29, 177, 119, 0.8)',
                      ':hover': {
                        backgroundColor: 'rgba(29, 177, 119, 0.6)',
                        color: 'white',
                      },
                      px: '5vw',
                    }}
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? '완료'
                      : '다음'}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
