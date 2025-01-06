export class DocumentResponseDto {
  success: boolean;
  message: string;
  data?: {
    documents: Document | Document[];
    page?: number;
    total?: number;
  };

  constructor(
    success: boolean,
    message: string,
    data?: { documents: Document | Document[]; page?: number; total?: number },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
