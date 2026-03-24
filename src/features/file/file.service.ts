import { apiClient } from "@/api/client";
import { FILE } from "@/constants/apiEndpoint";
import type { FileUploadResponse } from "./file.types";

export const fileService = {
	uploadImage(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		return apiClient.post<FileUploadResponse>(FILE.IMAGE, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	uploadPdf(file: File) {
		const formData = new FormData();
		formData.append("file", file);

		return apiClient.post<FileUploadResponse>(FILE.PDF, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};
