/**
 * Função para extrair a mensagem de erro de um objeto de erro.
 * @param error O erro que foi capturado no bloco try/catch.
 * @returns Uma string contendo a mensagem do erro.
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
