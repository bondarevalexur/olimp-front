import { useEffect, useState } from "react";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import Button from "../../components/Button";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FileUploadInput from "../../components/FileUploadInput";
import FileView from "../../components/FileView";
import { api } from "../../api.tsx";

function Files({ getPage, remoteId }: any) {
  async function handleSubmit(selectedFile: File) {
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("name", selectedFile?.name);

    try {
      const response = await api.post(`/files/`, formData, {});

      if (response.status !== 201) {
        throw new Error("File upload failed");
      }

      const body = { files: [{ id: response?.data?.id }] };

      api.patch(`/pages/${remoteId}/`, body);

      getPage();
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return <FileUploadInput onSubmit={handleSubmit} />;
}

function Main({ remoteId }: any) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useRouteLoaderData("layout") as any;

  const [page, setPage] = useState<any>();
  const [content, setContent] = useState("");
  const [editorData, setEditorData] = useState("");

  function getPage() {
    api
      .get(`/pages/${remoteId}`, {})
      .then((res) => res.data)
      .then((data) => {
        setContent(data?.content);
        setEditorData(data?.content);
        setPage(data);
      });
  }

  useEffect(() => {
    getPage();
  }, [remoteId]);

  function handleSubmit() {
    const body = {
      content: editorData,
    };

    api
      .put(`/pages/${remoteId}/`, body)
      .then((res) => res.data)
      .then((data) => {
        setContent(data?.content);
        setEditorData(data?.content);
        navigate(location.pathname);
      });
  }

  if (location?.search === "?edit" && user?.isAdmin)
    return (
      <div className="max-w-full m-20 [&_.ck-content]:h-[500px]">
        <h2>CKEditor</h2>
        <div className="mb-4">
          <Button className="mr-4" onClick={handleSubmit}>
            Сохранить страницу
          </Button>
          <Button onClick={() => navigate(location.pathname)}>Отмена</Button>

          <h3>Файлы</h3>

          {page?.files?.map((file: any) => (
            <FileView file={file} key={file.id} getPage={getPage} />
          ))}

          <Files getPage={getPage} remoteId={remoteId} />
        </div>

        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [
              "heading", // Заголовки
              "|",
              "bold", // Жирный шрифт
              "italic", // Курсив
              "|",
              "link", // Ссылка
              "blockQuote", // Цитата
              "numberedList", // Нумерованный список
              "bulletedList", // Маркированный список
              "bulletedList", // Маркированный список
              "|",
              "insertTable", // Вставка таблицы
              "tableColumn", // Добавление столбца
              "tableRow", // Добавление строки
              "mergeTableCells", // Объединение ячеек
              "|",
              "|",
              "undo", // Отменить
              "redo", // Повторить
            ],
            link: {
              addTargetToExternalLinks: true,

              decorators: [
                {
                  mode: "manual",
                  label: "Файл",
                  attributes: {
                    "data-file": "file",
                  },
                },
              ] as any,
            },
          }}
          data={editorData}
          onChange={(_, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
        />
        <div>
          <h3>Как будет выглядеть страница:</h3>
          <div dangerouslySetInnerHTML={{ __html: editorData }} />
        </div>

        <Button className="mr-4" onClick={handleSubmit}>
          Сохранить страницу
        </Button>

        <Button onClick={() => navigate(location.pathname)}>Отмена</Button>
      </div>
    );

  return (
    <section
      className="max-w-full m-20"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default Main;
