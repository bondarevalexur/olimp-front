import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";

import Button from "components/Button";
import FileUploadInput from "components/FileUploadInput";
import FileView from "components/FileView";

import { useGetPageQuery, useUpdatePageMutation } from "services/storeApi";

import { api } from "services/api.tsx";

function Files({ getPage, remoteId }: any) {
  async function handleSubmit(selectedFile: File) {
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("name", selectedFile?.name);

    try {
      // TODO
      const response = await api.post(`/files/`, formData, {});

      if (response.status !== 201) {
        throw new Error("File upload failed");
      }

      const body = { files: [{ id: response?.data?.id }] };
      // TODO
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

  const [editorData, setEditorData] = useState("");

  const user = useRouteLoaderData("layout") as any;
  const { data } = useGetPageQuery({ id: remoteId });

  const [updatePage] = useUpdatePageMutation();

  useEffect(() => {
    setEditorData(data?.content ?? "");
  }, [data]);

  function handleSubmit() {
    const body = {
      content: editorData,
    };

    updatePage({ id: remoteId, body });
    navigate(location.pathname);
  }

  if (location?.search === "?edit" && user?.isAdmin)
    return (
      <div className="m-20 max-w-full [&_.ck-content]:h-[500px]">
        <h2>CKEditor</h2>
        <div className="mb-4">
          <Button className="mr-4" onClick={handleSubmit}>
            Сохранить страницу
          </Button>
          <Button onClick={() => navigate(location.pathname)}>Отмена</Button>

          <h3>Файлы</h3>

          {data?.files?.map((file: any) => (
            <FileView file={file} key={file.id} getPage={() => {}} />
          ))}

          <Files getPage={() => {}} remoteId={remoteId} />
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

  return <section className="m-20 max-w-full" dangerouslySetInnerHTML={{ __html: editorData }} />;
}

export default Main;
