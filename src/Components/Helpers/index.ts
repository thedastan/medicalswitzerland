export const onChangeImage = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageFile: (value: string) => void
) => {
  e.preventDefault();

  let files: FileList | null | any;
  files = e.target.files;

  const read = new FileReader();
  read.onload = () => {
    setImageFile(read.result as string);
  };

  read.readAsDataURL(files[0]);
};

export function dataURLtoFile(dataurl: any, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
