import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

export const msgSuccess = (message) => {
  toast.success(message);
};

export const msgError = (msg) => {
  toast.error(msg);
};

// export const msgConfirm = (info, message, func) => {
//   awn.confirm(`Are You Sure ${info}`, async () => {
//     awn.info(message);
//     await func();
//   });
// };

export const msgConfirm = (msg, func) => {
  swal({
    title: `Are you sure?`,
    text: msg,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      func();
    }
  });
};
