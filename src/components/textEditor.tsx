import { Editor } from "@tinymce/tinymce-react";

interface Props {
  value: string;
  OnChangeEditor: (e: string) => void;
}
const TextEditor = ({ value, OnChangeEditor }: Props) => {
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = function () {
      const file = this.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result?.toString().split(",")[1];
          const blobInfo = blobCache.create(file.name, file, base64);
          blobCache.add(blobInfo);
          window.tinymce.activeEditor.insertContent(
            `<img src="${blobInfo.blobUri()}" alt="${file.name}" />`
          );
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const videoHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.onchange = function () {
      const file = this.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          window.tinymce.activeEditor.insertContent(
            `<video controls src="${reader.result}" title="${file.name}"></video>`
          );
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const audioHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "audio/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const audioSrc = reader.result as string;
          window.tinymce.activeEditor?.insertContent(
            `<audio controls src="${audioSrc}" title="${file.name}"></audio>`
          );
        };
        reader.readAsDataURL(file);
      }
    };
  };
  const plugins = [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
    "textcolor colorpicker",
  ];

  const toolbar = [
    "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media audio | removeformat | help",
  ];

  return (
    <div className="editor-container">
      <Editor
        initialValue=""
        apiKey="36yq0o12un80erkntz2avqgqzo23r7mjk5ooaap7n0qvihss"
        init={{
          height: 500,
          menubar: "file edit view insert format tools table",
          plugins: plugins.join(" "),
          toolbar: toolbar.join(" "),
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === "image") {
              imageHandler();
            } else if (meta.filetype === "media") {
              videoHandler();
            }
          },
        }}
        value={value}
        onEditorChange={(content: string) => OnChangeEditor(content)}
      />
    </div>
  );
};
export default TextEditor;
