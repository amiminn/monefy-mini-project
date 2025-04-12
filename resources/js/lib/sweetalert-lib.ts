import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

export function alertSuccess(title: string) {
    Toast.fire({
        icon: "success",
        title: title,
    });
}
export function alertError(title: string) {
    Toast.fire({
        icon: "error",
        title: title,
    });
}
export function alertWarning(title: string) {
    Toast.fire({
        icon: "warning",
        title: title,
    });
}
