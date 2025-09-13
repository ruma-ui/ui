import React from "react";
import { cn } from "@/utils/cn";
import { tw } from "@/utils/tw";

export interface FileUploadProps {
    /**
     * The visual style of the file upload
     * @default "primary"
     */
    variant?: "primary" | "secondary" | "dashed";
    /**
     * The size of the file upload area
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
    /**
     * Control the border radius of the file upload
     * @default "md"
     */
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    /**
     * Make file upload take full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Allow multiple file selection
     * @default false
     */
    multiple?: boolean;
    /**
     * Accepted file types (e.g., "image/*", ".pdf", ".doc,.docx")
     */
    accept?: string;
    /**
     * Maximum file size in bytes
     */
    maxSize?: number;
    /**
     * Maximum number of files allowed
     */
    maxFiles?: number;
    /**
     * Disable the file upload
     * @default false
     */
    disabled?: boolean;
    /**
     * Show drag and drop area
     * @default true
     */
    dragAndDrop?: boolean;
    /**
     * Custom placeholder text
     * @default "Click to upload or drag and drop"
     */
    placeholder?: string;
    /**
     * Custom upload button text
     * @default "Choose File"
     */
    buttonText?: string;
    /**
     * Show file list
     * @default true
     */
    showFileList?: boolean;
    /**
     * Callback when files are selected
     */
    onFilesSelected?: (files: File[]) => void;
    /**
     * Callback when files are removed
     */
    onFileRemoved?: (file: File, index: number) => void;
    /**
     * Callback for validation errors
     */
    onError?: (error: string) => void;
    /**
     * Current selected files
     */
    value?: File[];
    /**
     * Custom upload icon - accepts any React element
     * @default File upload SVG icon
     */
    icon?: React.ReactNode;
    /**
     * Custom class name
     */
    className?: string;
}

const wrapperBase = tw`relative inline-flex w-full flex-col`;
const uploadAreaBase = tw`relative flex flex-col items-center justify-center border-2 border-dashed bg-white transition-all duration-200 focus-within:ring-3 disabled:cursor-not-allowed disabled:opacity-50`;

const variants = {
    primary: tw`border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-200 hover:border-blue-400`,
    secondary: tw`border-gray-300 bg-gray-50 focus-within:border-gray-500 focus-within:ring-gray-200 hover:border-gray-400`,
    dashed: tw`border-gray-400 focus-within:border-blue-500 focus-within:ring-blue-200 hover:border-blue-500`,
};

const sizes = {
    sm: {
        container: tw`min-h-[120px] p-4`,
        text: tw`text-sm`,
        button: tw`px-3 py-1.5 text-xs`,
        icon: 30,
    },
    md: {
        container: tw`min-h-[160px] p-6`,
        text: tw`text-base`,
        button: tw`px-4 py-2 text-sm`,
        icon: 40,
    },
    lg: {
        container: tw`min-h-[200px] p-8`,
        text: tw`text-lg`,
        button: tw`px-4 py-2 text-sm`,
        icon: 50,
    },
} as const;

const roundedOptions = {
    none: tw`rounded-none`,
    sm: tw`rounded-sm`,
    md: tw`rounded-md`,
    lg: tw`rounded-lg`,
    xl: tw`rounded-xl`,
    full: tw`rounded-full`,
};

const buttonBase = tw`inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50`;

// Default file upload icon
const DefaultFileUploadIcon = ({ size = 24 }: { size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-file-up-icon lucide-file-up"
    >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M12 12v6" />
        <path d="m15 15-3-3-3 3" />
    </svg>
);

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
    (
        {
            variant = "primary",
            size = "md",
            rounded = "md",
            fullWidth = false,
            multiple = false,
            accept,
            maxSize,
            maxFiles,
            disabled = false,
            dragAndDrop = true,
            placeholder = "Click to upload or drag and drop",
            buttonText = "Choose File",
            showFileList = true,
            icon = <DefaultFileUploadIcon size={sizes[size].icon} />,
            onFilesSelected,
            onFileRemoved,
            onError,
            value = [],
            className = "",
            ...props
        },
        ref,
    ) => {
        // Determine if component is controlled
        const isControlled = React.useRef(value !== undefined);
        const prevValueRef = React.useRef<File[]>(isControlled.current ? value || [] : []);

        const [files, setFiles] = React.useState<File[]>(() => {
            // Initialize with value if controlled, empty array if uncontrolled
            return isControlled.current ? value || [] : [];
        });
        const [isDragOver, setIsDragOver] = React.useState(false);
        const [errors, setErrors] = React.useState<string[]>([]);

        const fileInputRef = React.useRef<HTMLInputElement>(null);
        const uploadAreaRef = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => uploadAreaRef.current as HTMLDivElement);

        // Update internal state when value prop changes (controlled component)
        React.useEffect(() => {
            if (isControlled.current) {
                // Check if the value has actually changed to prevent infinite loops
                const hasChanged =
                    !prevValueRef.current ||
                    value.length !== prevValueRef.current.length ||
                    value.some((file, index) => {
                        const prevFile = prevValueRef.current?.[index];
                        return (
                            !prevFile ||
                            file.name !== prevFile.name ||
                            file.size !== prevFile.size ||
                            file.lastModified !== prevFile.lastModified
                        );
                    });

                if (hasChanged) {
                    setFiles(value);
                    prevValueRef.current = [...value];
                }
            }
        }, [value]);

        const validateFile = (file: File): string | null => {
            if (maxSize && file.size > maxSize) {
                return `File "${file.name}" is too large. Maximum size is ${formatFileSize(maxSize)}.`;
            }
            return null;
        };

        const validateFiles = (fileList: File[]): { validFiles: File[]; errors: string[] } => {
            const validFiles: File[] = [];
            const validationErrors: string[] = [];

            for (const file of fileList) {
                const error = validateFile(file);
                if (error) {
                    validationErrors.push(error);
                } else {
                    validFiles.push(file);
                }
            }

            if (maxFiles && validFiles.length > maxFiles) {
                validationErrors.push(`Maximum ${maxFiles} files allowed.`);
                validFiles.splice(maxFiles);
            }

            return { validFiles, errors: validationErrors };
        };

        const handleFiles = (fileList: FileList | null) => {
            if (!fileList) return;

            const newFiles = Array.from(fileList);
            const { validFiles, errors: validationErrors } = validateFiles(newFiles);

            if (validationErrors.length > 0) {
                setErrors(validationErrors);
                onError?.(validationErrors.join(" "));
                return;
            }

            setErrors([]);

            let updatedFiles: File[];
            if (multiple) {
                updatedFiles = [...files, ...validFiles];
                if (maxFiles && updatedFiles.length > maxFiles) {
                    updatedFiles = updatedFiles.slice(0, maxFiles);
                }
            } else {
                updatedFiles = validFiles.slice(0, 1);
            }

            setFiles(updatedFiles);
            onFilesSelected?.(updatedFiles);
        };

        const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFiles(e.target.files);
            // Reset input value to allow selecting the same file again
            e.target.value = "";
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragOver(false);
            if (disabled || !dragAndDrop) return;
            handleFiles(e.dataTransfer.files);
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (disabled || !dragAndDrop) return;
            setIsDragOver(true);
        };

        const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (disabled || !dragAndDrop) return;
            setIsDragOver(false);
        };

        const handleClick = () => {
            if (disabled) return;
            fileInputRef.current?.click();
        };

        const handleRemoveFile = (index: number) => {
            const updatedFiles = files.filter((_, i) => i !== index);
            setFiles(updatedFiles);
            onFileRemoved?.(files[index], index);
            onFilesSelected?.(updatedFiles);
        };

        const formatFileSize = (bytes: number): string => {
            if (bytes === 0) return "0 Bytes";
            const k = 1024;
            const sizes = ["Bytes", "KB", "MB", "GB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
        };

        const getFileIcon = (file: File): string => {
            const type = file.type;
            if (type.startsWith("image/")) return "🖼️";
            if (type.startsWith("video/")) return "🎥";
            if (type.startsWith("audio/")) return "🎵";
            if (type.includes("pdf")) return "📄";
            if (type.includes("zip") || type.includes("rar")) return "📦";
            return "📄";
        };

        return (
            <div className={cn(wrapperBase, fullWidth && "w-full", className)} {...props}>
                <div
                    ref={uploadAreaRef}
                    className={cn(
                        uploadAreaBase,
                        variants[variant],
                        sizes[size].container,
                        roundedOptions[rounded],
                        isDragOver && dragAndDrop && "border-blue-500 bg-blue-50",
                        disabled && "pointer-events-none",
                        fullWidth && "w-full",
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-disabled={disabled}
                    aria-label={placeholder}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="sr-only"
                        multiple={multiple}
                        accept={accept}
                        onChange={handleFileInputChange}
                        disabled={disabled}
                        aria-hidden="true"
                    />

                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4 text-gray-400">{icon}</div>
                        <p className={cn("mb-2 font-medium text-gray-900", sizes[size].text)}>
                            {placeholder}
                        </p>
                        <button
                            type="button"
                            className={cn(buttonBase, sizes[size].button)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick();
                            }}
                            disabled={disabled}
                        >
                            {buttonText}
                        </button>
                        {accept && <p className="mt-2 text-xs text-gray-500">Accepted: {accept}</p>}
                        {maxSize && (
                            <p className="mt-1 text-xs text-gray-500">
                                Max size: {formatFileSize(maxSize)}
                            </p>
                        )}
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="mt-2">
                        {errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-600">
                                {error}
                            </p>
                        ))}
                    </div>
                )}

                {showFileList && files.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">
                            Selected Files ({files.length})
                        </h4>
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-3"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">{getFileIcon(file)}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        className="aspect-square h-6 w-6 cursor-pointer rounded-full border border-gray-200 text-xs text-gray-400 transition hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:outline-none"
                                        aria-label={`Remove ${file.name}`}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    },
);

FileUpload.displayName = "FileUpload";
