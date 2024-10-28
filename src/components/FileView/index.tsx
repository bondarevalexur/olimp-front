import { toast } from "react-toastify";

import Button from "components/Button";

import { api } from "services/api.tsx";

function FileUploadInput({ file, getPage }: any) {
  return (
    <div className="my-2 flex items-center gap-4 rounded border border-gray-200 p-2">
      <a href={file.file} target="_blank" className="m-0">
        Файл: {file.name}
      </a>

      <Button variant="primary" size="sm" onClick={() => navigator.clipboard.writeText(file.file)}>
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
            .then(() => toast.warning("Исправьте ссылки, так как данный файл теперь недоступен"))
        }
      >
        Удалить
      </Button>
    </div>
  );
}

export default FileUploadInput;
