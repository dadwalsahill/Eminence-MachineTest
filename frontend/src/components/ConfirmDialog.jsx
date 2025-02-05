import Swal from "sweetalert2";

/**
 * Show a confirmation dialog
 * @param {string} title - Title of the alert
 * @param {string} text - Message to display
 * @param {function} onConfirm - Function to execute when user confirms
 */
const ConfirmDialog = (title, text, onConfirm) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export default ConfirmDialog;
