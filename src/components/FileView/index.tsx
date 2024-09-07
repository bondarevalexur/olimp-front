import Button from "../Button";
import { toast } from "react-toastify";
import { api } from "../../api.tsx";

function FileUploadInput({ file, getPage }: any) {
  return (
    <div className="flex gap-4 items-center my-2 border border-gray-200 p-2 rounded">
      <a href={file.file} target="_blank" className="m-0">
        Файл: {file.name}
      </a>

      <Button
        variant="primary"
        size="sm"
        onClick={() => navigator.clipboard.writeText(file.file)}
      >
        Копировать ссылку
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          api
            .delete(`/files/${file?.id}/`, {
              method: "DELETE",
            })
            .then(getPage)
            .then(() =>
              toast.warning(
                "Исправьте ссылки, так как данный файл теперь недоступен",
              ),
            )
        }
      >
        Удалить
      </Button>
    </div>
  );
}

export default FileUploadInput;
