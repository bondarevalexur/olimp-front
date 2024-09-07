import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import Button from "../Button";

interface FileUploadInputProps {
  onFileUpload?: (file: File) => void;
  onSubmit?: (file: File) => any;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  onFileUpload,
  onSubmit,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [downloadedFile, setDownloadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file && onFileUpload) {
      onFileUpload(file); // Вызываем коллбэк с загруженным файлом
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Открываем диалог выбора файла
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      const res = await onSubmit?.(selectedFile);
      if (res?.file) setSelectedFile(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-2">
        <input
          ref={fileInputRef} // Присваиваем ref
          type="file"
          onChange={handleFileChange}
          accept="image/*, .pdf, .docx" // Настройте типы файлов, которые можно загружать
          style={{ display: "none" }} // Скрываем стандартный input
        />
        <Button type="button" onClick={handleButtonClick} variant="secondary">
          Открыть
        </Button>
        {selectedFile && (
          <div className="flex gap-2 items-center">
            <p className="m-0">Выбранный файл: {selectedFile.name}</p>
            <Button type="submit" variant="primary" size="sm">
              Добавить файл на страницу
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default FileUploadInput;
