import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { GoUpload } from "react-icons/go";

type FileUploaderProps = {
    setPreviewImage: Dispatch<SetStateAction<File | null>>
    message?: string
}

const FileUploader = ({ setPreviewImage, message='Upload Image' }: FileUploaderProps) => {
    const [files, setFiles] = useState<(File & {preview:string})[]>([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file)));
            setPreviewImage(acceptedFiles[0]);
        }
    })

    useEffect(() => {

        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <div {...getRootProps()} className="w-full border py-4 flex justify-center items-center border-gray-200 border-dashed">
            <input {...getInputProps()} />
            <div className="flex items-center gap-2 justify-center">
                <GoUpload size={24} />
                {isDragActive ? <p className="text-center text-md">Drop the files here ...</p> : <p className="text-center text-md">{message}</p>}
            </div>
        </div>
    );
}

export default FileUploader;
