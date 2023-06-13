/* {isLogin ? (
  setIsLogin(false)
  ) : (
  <Route
    path="/login"
    element={
      <Login
        userid={userid}
        userpw={userpw}
        setLoginStatOK={setLoginStatOK}
      />
    }
    onClick={event => {
      if (isLogin) {
        event.preventDefault();
        setIsLogin(false);
        console.log('isLogin:', isLogin);
      }
    }}></Route>
  )} */





  
// function Main() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/diary_new" element={<DiaryEditor />}></Route>
//           <Route path="/diary" element={<Diary />}></Route>
//           {/* <Route path="/todo" element={<Todo />}></Route> */}
//           <Route path="/todo" element={<TodoNew />}></Route>
//           <Route path="/dday" element={<Dday />}></Route>

//           <Route path="/support" element={<Support />}></Route>
//           <Route path="/login" element={<Login />}></Route>
//           <Route path="/register" element={<Register />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
