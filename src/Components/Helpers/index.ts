import heic2any from "heic2any";
import API from "../../Api";
import { ActionGroupPut } from "../Interface/redux-image/action/Action";
import { IInfoList } from "../Interface/redux-image/types/Types";
import {
  ActionError,
  ActionErrorMessenger,
} from "../Ui/popups/redux/action/Action";

interface IHandlePutFilesProps {
  text: string;
  filePdf: any;
  idFile: string;
  cropData: string;
  group: IInfoList;
  ActionAllGroups: () => void;
  setText: (value: string) => void;
  setLoader: (value: boolean) => void;
  setCropData: (value: string) => void;
  setImageFile: (value: string) => void;
  setPdfIncludes: (value: boolean) => void;
}

interface IHandlePutFileProps {
  text: string;
  idFile: string;
  group: IInfoList;
  ActionAllGroups: () => void;
  setText: (value: string) => void;
  setCropData: (value: string) => void;
  setImageFile: (value: string) => void;
  setPdfIncludes: (value: boolean) => void;
}

export const getResultBase64 = async (
  file: File,
  setBase64: (value: any) => void
) => {
  try {
    const reader = await new FileReader();
    reader.onload = () => {
      setBase64(reader.result as any);
    };
    reader.readAsDataURL(file);
  } catch (e) {
    ActionError(true);
    ActionErrorMessenger("fileABig");
  }
};

export const onChangeImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageFile: (value: string) => void,
  setFile: (value: File) => void,
  setLoad: (value: boolean) => void
) => {
  e.preventDefault();

  let files: FileList | null = e.target.files;
  if (!files?.length) return;
  let selectedImage: File = files[0];

  setLoad(true);

  const mimeType = selectedImage.type;
  const reduceFileSize = async (
    file: File,
    maxWidth: number,
    maxHeight: number
  ) => {
    const reader = new FileReader();
    return new Promise<File>((resolve) => {
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;

          // Пропорционально изменяем размеры
          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (aspectRatio > 1) {
              width = maxWidth;
              height = maxWidth / aspectRatio;
            } else {
              height = maxHeight;
              width = maxHeight * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(
                    new File([blob], `${file.name}`, {
                      type: "image/jpeg",
                      lastModified: Date.now(),
                    })
                  );
                }
              },
              "image/jpeg",
              0.8 // Качество (от 0 до 1)
            );
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  if (
    mimeType.toLowerCase().includes("heic") ||
    mimeType.toLowerCase().includes("heif") ||
    !mimeType
  ) {
    const heicBuffer = await selectedImage.arrayBuffer();
    const jpegBlob = await heic2any({
      blob: new Blob([heicBuffer], { type: mimeType }),
      toType: "image/jpeg",
    });

    const processedFile = Array.isArray(jpegBlob)
      ? new File([jpegBlob[0]], `${selectedImage.name}.jpeg`, {
          type: jpegBlob[0].type,
          lastModified: Date.now(),
        })
      : new File([jpegBlob], `${selectedImage.name}.jpeg`, {
          type: jpegBlob.type,
          lastModified: Date.now(),
        });

    const resizedFile = await reduceFileSize(processedFile, 800, 800); // Уменьшаем до 800x800
    getResultBase64(resizedFile, setImageFile);
    setFile(resizedFile);
  } else {
    const resizedFile = await reduceFileSize(selectedImage, 800, 800); // Уменьшаем до 800x800
    getResultBase64(resizedFile, setImageFile);
    setFile(resizedFile);
  }

  setLoad(false);
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

export const getAccessToken = () => {
  return localStorage.getItem("accessToken" as any);
};

export const handlePutFiles = async ({
  text,
  group,
  idFile,
  filePdf,
  cropData,
  setText,
  setLoader,
  setCropData,
  setImageFile,
  setPdfIncludes,
  ActionAllGroups,
}: IHandlePutFilesProps) => {
  const image = cropData
    ? dataURLtoFile(cropData, `${Math.floor(Math.random() * 100000)}.png`)
    : filePdf;
  if (cropData || filePdf) {
    const formData = new FormData();
    formData.append("file", image);

    setLoader(true);
    await API.post("users/upload/", formData)
      .then(({ data }) => {
        if (data) {
          ActionGroupPut(
            idFile,
            group.id,
            {
              file_url: data.path || group.file_url,
              text: text || group.text,
              id: group.id,
              created_date: group.created_date,
            },
            setText
          );
          setCropData("");
          setImageFile("");
          setLoader(false);
          ActionAllGroups();
          setPdfIncludes(false);
        }
      })
      .catch((e) => {
        setText("");
        setLoader(false);
        ActionError(true);
        ActionAllGroups();
        setPdfIncludes(false);
        ActionErrorMessenger(e);
      });
  } else {
    ActionGroupPut(
      idFile,
      group.id,
      {
        file_url: group.file_url,
        text: text || group.text,
        id: group.id,
        created_date: group.created_date,
      },
      setText
    );
    ActionAllGroups();
  }
};

export const handlePutFile = ({
  ActionAllGroups,
  group,
  text,
  setText,
  setPdfIncludes,
  setCropData,
  setImageFile,
  idFile,
}: IHandlePutFileProps) => {
  ActionGroupPut(
    idFile,
    group.id,
    {
      file_url: group.file_url,
      text: text || group.text,
      id: group.id,
      created_date: group.created_date,
    },
    setText
  );
  ActionAllGroups();
  setCropData("");
  setImageFile("");
  // setDeleteCenceled(false);
  setPdfIncludes(false);
};
