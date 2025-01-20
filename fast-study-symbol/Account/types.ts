export interface AccountInfo {
  mosaics: {
    id: string;
    amount: string;
  }[];
}

export interface MosaicInfo {
  divisibility: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}
