
export function isPDF(file: File): boolean {
  return file.type === 'application/pdf';
}


export function isFileSizeValid(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  return file.size <= maxSizeBytes;
}


export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}

export function createFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}


export function revokeFilePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}