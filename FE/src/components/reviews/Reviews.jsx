import { Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import EditIcon from '@mui/icons-material/Edit';

// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import styles from '../../styles/reviews/Reviews.module.css';
import ReviewsList from './ReviewList';
import ReviewsSearch from './ReviewsSearch';
import ReviewWrite from './ReviewWrite';

function Reviews() {
  const [writeClick, setWriteClick] = useState(false);
  return (
    <div className={styles.flexdiv}>
      <ReviewsSearch />
      <ReviewsList />
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          setWriteClick(!writeClick);
        }}
        startIcon={<EditIcon />}
        style={{
          backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
          color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
          fontSize: '1.5rem', // 버튼의 글자 크기를 조절
          padding: '15px 30px', // 버튼의 내부 여백을 조절
          borderRadius: '40px',
        }}
      >
        기록하기
      </Button>
      {/* <ReviewWrite /> */}
      {writeClick === true ? <ReviewWrite /> : null}
      {/* <FormDialog /> */}
    </div>
  );
}

export default Reviews;

// function FormDialog() {
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button
//         type="button"
//         variant="contained"
//         onClick={handleClickOpen}
//         startIcon={<EditIcon />}
//         style={{
//           backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
//           color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
//           fontSize: '1.5rem', // 버튼의 글자 크기를 조절
//           padding: '15px 30px', // 버튼의 내부 여백을 조절
//           borderRadius: '40px',
//         }}
//       >
//         기록하기
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         BackdropProps={{
//           invisible: true, // 배경을 사용하지 않음
//         }}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries(formData.entries());
//             const { email } = formJson;
//             console.log(email);
//             handleClose();
//           },
//         }}
//         sx={{
//           '& .MuiDialogTitle-root': {
//             backgroundColor: '#fffff',
//             borderBottom: '1px solid #555558',
//           },
//           '& .MuiDialogContent-root': {
//             padding: '20px',
//             width: '300px',
//           },
//           '& .MuiDialogActions-root': {
//             justifyContent: 'center',
//           },
//           position: 'fixed',
//           marginLeft: '400px',
//           marginBottom: '300px',
//           top: '21.5px',
//           width: '450px',
//           height: 'calc(100%)',
//         }}
//       >
//         <DialogTitle>
//           <img src="" alt="" />
//           <span>상호명</span>
//           <br />
//           <p>N번째 방문이네요!</p>
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             <div>항목별 평점</div>
//             <hr />
//             <div>업종</div>
//             <hr />
//             <div>사진 첨부</div>
//             <hr />
//             <div>내용입력</div>
//             <hr />
//             <div>같이 방문한 친구</div>
//             <hr />
//             <div>방문한 날짜</div>
//             <hr />
//           </DialogContentText>
//           {/* <TextField
//             required
//             margin="dense"
//             id="name"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           /> */}
//         </DialogContent>

//         <DialogActions>
//           <Button
//             type="submit"
//             style={{
//               border: '1px solid rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
//               color: 'rgba(29, 177, 119, 0.7)', // 버튼의 글자색을 흰색으로 설정
//               fontSize: '0.7rem', // 버튼의 글자 크기를 조절
//               padding: '15px 30px', // 버튼의 내부 여백을 조절
//               borderRadius: '40px',
//             }}
//           >
//             저장
//           </Button>
//           <Button
//             onClick={handleClose}
//             style={{
//               border: '1px solid rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
//               color: 'rgba(29, 177, 119, 0.7)', // 버튼의 글자색을 흰색으로 설정
//               fontSize: '0.7rem', // 버튼의 글자 크기를 조절
//               padding: '15px 30px', // 버튼의 내부 여백을 조절
//               borderRadius: '40px',
//             }}
//           >
//             취소
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
