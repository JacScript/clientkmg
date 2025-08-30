// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Unauthorized from "./Unauthorized";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "../http";
// import { clearCredentials } from "../redux/slices/userSlice";

// const AdminRoute = ({ component: Component, ...rest }) => {
//   const userInfo = useSelector((state) => state.auth);
//   console.log(userInfo);
//   const dispatch = useDispatch();

//    const logoutMutation = useMutation({
//     mutationFn: logout,
//     onSuccess: (data) => {
//       dispatch(clearCredentials());
//       enqueueSnackbar(data?.message || "Logged out successfully", {
//         variant: "success",
//       });
//       history.push("/admin/");
//     },
//     onError: (error) => {
//       console.error("Logout error:", error);
//       enqueueSnackbar("Logout failed", { variant: "error" });
//     },
//   });

//   const handleLogout = () => {
//     logoutMutation.mutate();
//   };

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         userInfo & userInfo?.isAuth ? (
//           userInfo.userInfo.role === "admin" ? (
//             <Component {...props} />
//           ) : (
//             <Unauthorized onLogout={handleLogout} />
//           )
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default AdminRoute;


import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Unauthorized from "./Unauthorized";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http";
import { clearCredentials } from "../redux/slices/userSlice";
import { useSnackbar } from "notistack";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuth, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      dispatch(clearCredentials());
      enqueueSnackbar(data?.message || "Logged out successfully", {
        variant: "success",
      });
      history.push("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      enqueueSnackbar("Logout failed", { variant: "error" });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          userInfo?.role === "admin" ? (
            <Component {...props} />
          ) : (
            <Unauthorized onLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;

