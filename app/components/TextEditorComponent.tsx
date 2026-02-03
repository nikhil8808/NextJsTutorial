"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css"; // ✅ KEEP IT HERE

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

interface TextEditorComponentProps {
  handleInputChange?: (name: string, value: string) => void;
  content?: string;
}

const TextEditorComponent = ({ handleInputChange,content }: TextEditorComponentProps  ) => {


  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={(value, delta, source) => {
        handleInputChange?.('content', value);
   
        
      }}
      placeholder="Compose your post here..."

    />
  );
};

export default TextEditorComponent;
