type TStatusSuccess = 200 | 201;
type TStatusError = 0 | 404 | 500;
type TStatus = TStatusSuccess | TStatusError | number;

interface IStatusProps {
  status: TStatus;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export function Status({
  status,
  successMessage = '',
  errorMessage = '',
  className = ''
}: IStatusProps) {
  const SUCCESS_STATUSES: { [key: number]: TStatusSuccess } = { 200: 200, 201: 201 };
  // const statusError: { [key: number]: TStatusError } = { 0: 0, 404: 404, 500: 500 };
  const type: 'success' | 'error' = SUCCESS_STATUSES[status] ? 'success' : 'error';
  const message = { success: successMessage, error: errorMessage };

  return status ? (
    <div
      className={`w-full h-max text-16 font-roobert_regular text-dark_navy py-8 px-16 rounded-8
        ${type === 'success' ? 'bg-green' : 'bg-red'}
        ${className}
        `}
    >
      {message[type].includes('<') ? (
        <p dangerouslySetInnerHTML={{ __html: message[type] }} />
      ) : (
        <p>{message[type]}</p>
      )}
    </div>
  ) : null;
}
