import React from 'react';
import { useDropzone } from 'react-dropzone';

function useGCPUpload({
  presignedUploadUrl,
}) {
  async function onDrop([pendingImage]) {
    // Upload the image to our pre-signed URL.
    const response = await fetch(
      new Request(presignedUploadUrl, {
        method: 'PUT',
        body: pendingImage,
        headers: new Headers({
          'Content-Type': 'application/pdf',
        }),
      }),
    );

    if (response.status !== 200) {
      console.error('Error!')
      return;
    }
  }

  return useDropzone({
    accept: '.pdf',
    disabled: typeof presignedUploadUrl !== 'string',
    onDrop,
  });
}

function ImageUpload() {
    // Insert gcp signed upload url
    const presignedUploadUrl = ''
    const { getRootProps, getInputProps } = useGCPUpload({
      presignedUploadUrl,
    })
    
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    );
  }

  export default ImageUpload